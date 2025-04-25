import httpStatus from 'http-status';
import config from '../../../config';
import stripe from '../../../config/stripe.config';
import ApiError from '../../../errors/ApiError';
import { CartModel } from '../cart/cart.model';
import { OrderModel } from '../order/order.model';
import UserModel from '../user/user.model';
import { PaymentModel } from './payment.model';

const stripeSession = async ({ userId }: { userId: string }) => {
  try {
    // Validate and get cart
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }

    if (!cart.items || cart.items.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cart is empty');
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.selected.price,
      0,
    );
    if (totalAmount <= 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid total amount');
    }

    // Format line items for Stripe
    const formattedLineItems = cart.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.offerName,
          images: [item.offerImage],
          metadata: {
            itemType: item.itemType,
            itemId: item.itemId.toString(),
            offerId: item.offerId.toString(),
            sellerId: item.seller.toString(),
          },
        },
        unit_amount: Math.ceil(item.selected.price * 100),
      },
      quantity: 1,
    }));

    // Create Stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: formattedLineItems,
      mode: 'payment',
      success_url: `${config.checkout_success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.checkout_cancel_url}`,
      payment_method_types: ['card'],
      metadata: {
        userId,
        cartId: cart._id.toString(),
        type: 'cart_purchase',
        mode: config.stripe.mode,
      },
      expires_at: Math.floor(Date.now() / 1000) + 60 * 30, // 30 minutes
    });

    // Update cart with session ID
    cart.sessionId = stripeSession.id;
    await cart.save();

    // Create initial payment record
    await PaymentModel.create({
      sessionStatus: 'open',
      sessionId: stripeSession.id,
      paymentStatus: 'unpaid',
      isPaid: false,
      mode: config.stripe.mode,
    });

    return {
      sessionId: stripeSession.id,
      url: stripeSession.url, // This is what you need for Checkout
      amount: totalAmount,
    };
  } catch (error) {
    console.error('Error creating stripe session:', { userId, error });
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to create payment session: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

const stripeVerifyPayment = async ({ sessionId }: { sessionId: string }) => {
  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
    const { status, payment_intent, payment_status } = stripeSession;

    // Check if payment was already processed
    const existingPayment = await PaymentModel.findOne({ sessionId });
    if (existingPayment) {
      return {
        sessionId,
        paymentId: payment_intent,
        paymentStatus: payment_status,
      };
    }

    // Find cart
    const cart = await CartModel.findOne({ sessionId });
    if (!cart) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }

    // Process successful payment
    if (cart.sessionId && payment_status === 'paid') {
      const dbUser = await UserModel.findOne({ userId: cart.userId });
      if (!dbUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }

      // Create payment record
      const newPayment = await PaymentModel.create({
        sessionStatus: status,
        sessionId: cart.sessionId,
        paymentId: payment_intent,
        paymentStatus: payment_status,
        paidAt: new Date(),
        isPaid: true,
        mode: config.stripe.mode,
      });

      // Create orders
      const orderPromises = cart.items.map(async (item) => {
        const newOrder = await OrderModel.create({
          item,
          totalPrice: item.selected.price,
          userId: cart.userId,
          promo: cart.promo,
          buyer: dbUser._id,
          payment: newPayment._id,
        });

        // Link order to payment
        await PaymentModel.findByIdAndUpdate(newPayment._id, {
          $addToSet: { orders: newOrder._id },
        });

        return newOrder;
      });

      await Promise.all(orderPromises);

      // Clear cart
      cart.sessionId = '';
      cart.items = [];
      cart.promo = undefined;
      await cart.save();

      return {
        sessionId: cart.sessionId,
        paymentId: payment_intent,
        paymentStatus: payment_status,
        ordersCreated: true,
      };
    }

    return null;
  } catch (error) {
    console.error('Payment verification error:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to verify payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export const PaymentService = {
  stripeSession,
  stripeVerifyPayment,
};
