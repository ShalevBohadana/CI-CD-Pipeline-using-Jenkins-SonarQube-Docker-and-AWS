import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { PAGINATION_FIELDS } from '../../helpers/pagination';
import { ORDER_FILTER_FIELDS } from './order.constant';
import { OrderService } from './order.service';

const createOrder: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { userId } = req.user;
    const result = await OrderService.createOrder({
      userId,
      ...req.body,
    });

    sendSuccessResponse(res, {
      statusCode: httpStatus.CREATED,
      data: result,
      message: 'Order created successfully!',
    });
  },
);

const getAllOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ORDER_FILTER_FIELDS);
    const paginationOptions = pick(req.query, PAGINATION_FIELDS);

    const result = await OrderService.getAllOrder(filters, paginationOptions);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      meta: result.meta || {},
      data: result.data || [],
      message: 'Orders retrieved successfully',
    });
  },
);

const getAllOrder = getAllOrders;

const getOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await OrderService.getOrderByOrderId(orderId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order retrieved successfully',
    });
  },
);

const acceptOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await OrderService.acceptOrder(orderId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order accepted successfully',
    });
  },
);

const rejectOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await OrderService.rejectOrder(orderId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order rejected successfully',
    });
  },
);

const completeOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await OrderService.completeOrder(orderId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order completed successfully',
    });
  },
);

const cancelOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await OrderService.cancelOrder(orderId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order cancelled successfully',
    });
  },
);

const getOrderReceived: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { userId } = req.user;
    const result = await OrderService.getOrderReceived(userId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order received fetched successfully',
    });
  },
);

const getOrderSent: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { userId } = req.user;
    const result = await OrderService.getOrderSent(userId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order sent fetched successfully',
    });
  },
);

const getOrderStats: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getOrderStats();

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order stats fetched successfully',
    });
  },
);

const getMyOrderStats: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { userId } = req.user;
    const result = await OrderService.getMyOrderStats(userId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'My order stats fetched successfully',
    });
  },
);

const getAcceptedOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ORDER_FILTER_FIELDS);
    const paginationOptions = pick(req.query, PAGINATION_FIELDS);

    const result = await OrderService.getAcceptedOrder(
      filters,
      paginationOptions,
    );

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Accepted order fetched successfully',
    });
  },
);

const getOrderByPartnerId: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getOrderByPartnerId(req.params.id);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Partner orders fetched successfully',
    });
  },
);

const createBalanceOrder: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { userId } = req.user;
    const result = await OrderService.createBalanceOrder({
      userId,
      ...req.body,
    });

    sendSuccessResponse(res, {
      statusCode: httpStatus.CREATED,
      data: result,
      message: 'Balance order created successfully',
    });
  },
);

const getOrderByOrderId: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getOrderByOrderId(req.params.id);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order fetched successfully',
    });
  },
);

const updateOrder: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const result = await OrderService.updateOrder({
      orderId: req.params.id,
      userId: req.user.userId,
      data: req.body,
    });

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order updated successfully',
    });
  },
);

const getOrderByUserId: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getOrderByUserId(req.params.id);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'User orders fetched successfully',
    });
  },
);

const joinGroupChat: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const result = await OrderService.joinGroupChat({
      userId: req.user.userId,
      id: req.params.id,
    });

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Joined group chat successfully',
    });
  },
);

const assignBoosterToOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { boosterId } = req.body;

    const result = await OrderService.assignBoosterToOrder(orderId, boosterId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Booster assigned successfully',
    });
  },
);

export const OrderController: {
  createOrder: RequestHandler;
  getAllOrders: RequestHandler;
  getAllOrder: RequestHandler;
  getOrder: RequestHandler;
  acceptOrder: RequestHandler;
  rejectOrder: RequestHandler;
  completeOrder: RequestHandler;
  cancelOrder: RequestHandler;
  getOrderReceived: RequestHandler;
  getOrderSent: RequestHandler;
  getOrderStats: RequestHandler;
  getMyOrderStats: RequestHandler;
  getAcceptedOrder: RequestHandler;
  getOrderByPartnerId: RequestHandler;
  createBalanceOrder: RequestHandler;
  getOrderByOrderId: RequestHandler;
  updateOrder: RequestHandler;
  getOrderByUserId: RequestHandler;
  joinGroupChat: RequestHandler;
  assignBoosterToOrder: RequestHandler;
} = {
  createOrder,
  getAllOrders,
  getAllOrder,
  getOrder,
  acceptOrder,
  rejectOrder,
  completeOrder,
  cancelOrder,
  getOrderReceived,
  getOrderSent,
  getOrderStats,
  getMyOrderStats,
  getAcceptedOrder,
  getOrderByPartnerId,
  createBalanceOrder,
  getOrderByOrderId,
  updateOrder,
  getOrderByUserId,
  joinGroupChat,
  assignBoosterToOrder,
};
