import { RequestHandler, Response } from 'express';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { CartService } from './cart.service';

const addToCart: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const cartData = req.body;
    const { userId } = req.user;
    const cart = await CartService.addToCart({ ...cartData, userId });
    sendSuccessResponse(res, {
      data: cart,
      message: 'Items added to cart successfully',
    });
  },
);

const removeFromCart: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const cartData = req.body;
    const { userId } = req.user;
    const cart = await CartService.removeFromCart({ ...cartData, userId });
    sendSuccessResponse(res, {
      data: cart,
      message: 'Item removed from cart successfully',
    });
  },
);

const applyPromo: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { code } = req.body;
    const { userId } = req.user;
    const cart = await CartService.applyPromo({ code, userId });
    sendSuccessResponse(res, {
      data: cart,
      message: 'Promo applied successfully',
    });
  },
);

const getCartByUserId: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { userId } = req.user;
    const cart = await CartService.getCartByUserId(userId);
    sendSuccessResponse(res, {
      data: cart,
      message: 'Cart fetched successfully',
    });
  },
);

export const CartController: {
  addToCart: RequestHandler;
  getCartByUserId: RequestHandler;
  removeFromCart: RequestHandler;
  applyPromo: RequestHandler;
} = {
  addToCart,
  getCartByUserId,
  removeFromCart,
  applyPromo,
};
