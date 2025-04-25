import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import UserModel from '../user/user.model';
import { CartModel } from './cart.model';
import {
  AddToCartPayload,
  Cart,
  CartPromo,
  RemoveFromCartPayload,
} from './cart.validation';

const addToCart = async ({
  userId,
  ...cartItem
}: AddToCartPayload & { userId: string }) => {
  let cart = await CartModel.findOne({ userId });

  if (!cart) {
    // If cart doesn't exist, create a new one
    cart = await CartModel.create({
      userId,
      items: [],
    });
  }

  // Add the new item to the items array
  cart.items.push(cartItem); // Assuming you're adding the first item in the array

  await cart.save();
  const populated1 = await CartModel.findOne({ userId })
    .populate({
      path: 'items.offerId',
      model: 'Offer',
    })
    .lean();
  const populated2 = await CartModel.findOne({ userId })
    .populate({
      path: 'items.offerId',
      model: 'OfferGameCurrency',
    })
    .lean();
  const res1 = [...(populated1?.items.filter((item) => item.offerId) || [])];
  const res2 = [...(populated2?.items.filter((item) => item.offerId) || [])];

  // populated1!.items = [...res1, ...res2];

  // return cart;
  return {
    userId,
    totalPrice: 0,
    items: [...res1, ...res2],
    sessionId: populated1?.sessionId || '',
    promo: populated1?.promo
  };
};
const removeFromCart = async ({
  userId,
  ...cartItem
}: RemoveFromCartPayload & { userId: string }): Promise<Cart> => {
  let cart = await CartModel.findOne({ userId });

  if (!cart) {
    // If cart doesn't exist, create a new one
    cart = await CartModel.create({
      userId,
      items: [],
    });
  }

  // Remove the item from the items array
  cart.items = cart.items.filter((item) => item.itemId !== cartItem.itemId);

  await cart.save();

  return cart;
};
const applyPromo = async ({
  userId,
  code,
}: CartPromo & { userId: string }): Promise<Cart> => {
  let cart = await CartModel.findOne({ userId });

  if (!cart) {
    // If cart doesn't exist, create a new one
    cart = await CartModel.create({
      userId,
      items: [],
    });
  }

  // Remove the item from the items array
  cart.promo = { code };

  await cart.save();

  return cart;
};
// const updateCart = async (cartId: string, cartData: Cart): Promise<Cart> => {
//   const isExist = await CartModel.findById(cartId);
//   if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Cart not found');

//   const existingServiceIndex = await isExist.service.findIndex((item) => {
//     return item.serviceId.equals(cartData.service[0].serviceId);
//   });

//   if (existingServiceIndex !== -1) {
//     isExist.service[existingServiceIndex].executionOption =
//       cartData.service[0].executionOption;
//     isExist.service[existingServiceIndex].additionalOption =
//       cartData.service[0].additionalOption;
//   } else {
//     isExist.service.push(cartData.service[0]);
//   }

//   const cart = await CartModel.findByIdAndUpdate(
//     isExist._id,
//     { service: isExist.service },
//     { new: true }
//   ).populate('service.serviceId');

//   if (!cart)
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update cart');

//   return cart;
// };

const getCartByUserId = async (userId: string): Promise<Cart> => {
  const user = await UserModel.findOne({ userId });
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');

  const populated1 = await CartModel.findOne({ userId })
    .populate({
      path: 'items.offerId',
      model: 'Offer',
      populate: {
        path: 'sellerId',
        model: 'User',
      },
    })
    .lean();
  const populated2 = await CartModel.findOne({ userId })
    .populate({
      path: 'items.offerId',
      model: 'OfferGameCurrency',
      populate: {
        path: 'sellerId',
        model: 'User',
      },
    })
    .lean();
  const res1 = [...(populated1?.items.filter((item) => item.offerId) || [])];
  const res2 = [...(populated2?.items.filter((item) => item.offerId) || [])];
  let cart = { ...populated1, items: [...res1, ...res2] } as Cart;
  // populated1!.items = [...res1, ...res2];

  // return cart;
  // return { ...populated1, items: [...res1, ...res2] };

  // if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, 'Cart not found');
  if (!cart) {
    // If cart doesn't exist, create a new one
    cart = await CartModel.create({
      userId,
      items: [],
    });
  }
  return cart;
};

// const getCartByCartId = async (cartId: string): Promise<Cart> => {
//   const cart = await CartModel.findById(cartId).populate('service.serviceId');
//   if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, 'Cart not found');
//   return cart;
// };

// const deleteCart = async (cartId: string): Promise<Cart> => {
//   const cart = await CartModel.findByIdAndDelete(cartId);
//   if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, 'Cart not found');
//   return cart;
// };

// const deleteAServiceFromCart = async (
//   cartId: string,
//   serviceId: string
// ): Promise<Cart> => {
//   const existingCart = await CartModel.findById(cartId).populate(
//     'service.serviceId'
//   );
//   if (!existingCart)
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Cart not found');

//   const existingServiceIndex = await existingCart.service.findIndex((item) =>
//     item.serviceId.equals(serviceId)
//   );

//   if (existingServiceIndex !== -1) {
//     existingCart.service.splice(existingServiceIndex, 1);
//   }

//   const cart = await CartModel.findByIdAndUpdate(
//     cartId,
//     { service: existingCart.service },
//     { new: true }
//   ).populate('service.serviceId');

//   if (!cart)
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update cart');

//   return cart;
// };

interface CartServiceType {
  addToCart: (params: AddToCartPayload & { userId: string }) => Promise<Cart>;
  removeFromCart: (params: RemoveFromCartPayload & { userId: string }) => Promise<Cart>;
  getCartByUserId: (userId: string) => Promise<Cart>;
  applyPromo: (params: CartPromo & { userId: string }) => Promise<Cart>;
}

export const CartService: CartServiceType = {
  addToCart,
  removeFromCart,
  getCartByUserId,
  applyPromo,
  // getCartByCartId,
  // deleteCart,
  // deleteAServiceFromCart,
  // updateCart,
};
