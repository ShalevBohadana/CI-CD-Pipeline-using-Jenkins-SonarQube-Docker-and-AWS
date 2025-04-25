import express from 'express';
import Stripe from 'stripe';
import httpStatus from 'http-status';

import stripe from '../../../config/stripe.config';
import { walletService } from '../wallet/wallet.service';
import { PaymentService } from './payment.service';
import ApiError from '../../../errors/ApiError';

const webhook = express.Router();

webhook.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res, next) => {
    try {
      const sig = req.headers['stripe-signature'];

      if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
        res.status(httpStatus.BAD_REQUEST).json({
          error: 'Missing signature or webhook secret',
        });
        return;
      }

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET,
        );
      } catch (err) {
        console.error(
          'Webhook signature verification failed:',
          err instanceof Error ? err.message : 'Unknown error',
        );
        res.status(httpStatus.BAD_REQUEST).json({
          error: 'Webhook signature verification failed',
        });
        return;
      }

      try {
        switch (event.type) {
          case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;

            if (!session.metadata?.type) {
              throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Missing session type in metadata',
              );
            }

            switch (session.metadata.type) {
              case 'wallet_recharge':
                if (!session.metadata.userId) {
                  throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    'Missing userId in metadata',
                  );
                }
                await walletService.stripeVerifyPayment({
                  sessionId: session.id,
                  userId: session.metadata.userId,
                });
                break;

              case 'cart_purchase':
                await PaymentService.stripeVerifyPayment({
                  sessionId: session.id,
                });
                break;

              default:
                console.warn(
                  `Unhandled session type: ${session.metadata.type}`,
                );
            }
            break;
          }

          case 'payment_intent.succeeded':
            // Handle successful payment intent if needed
            break;

          case 'payment_intent.payment_failed':
            // Handle failed payment intent if needed
            break;

          default:
            console.info(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
      } catch (error) {
        console.error(
          'Error processing webhook:',
          error instanceof Error ? error.message : 'Unknown error',
        );

        // Always return 200 to Stripe, even for errors we handle internally
        res.json({
          received: true,
          error: 'Processed but encountered an error',
        });
      }
    } catch (error) {
      next(error);
    }
  },
);

export const stripeWebhook = webhook;
