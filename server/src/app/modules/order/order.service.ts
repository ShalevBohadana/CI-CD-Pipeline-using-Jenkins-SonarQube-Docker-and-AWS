/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface';
import {
  getPaginatedCondition,
  getPaginatedData,
} from '../../helpers/pagination';
import { BoosterModel } from '../booster/booster.model';
import { CartModel } from '../cart/cart.model';
import { WalletModel } from '../wallet/wallet.model';
import { ORDER_SEARCH_FIELDS } from './order.constant';
import { getDiscordChannelAndInvite } from './order.helper';
import { OrderFilters, IOrder } from './order.interface';
import { OrderModel } from './order.model';
import { Order } from './order.validation';
import UserModel from '../user/user.model';
import { USER_ROLE_ENUM, ORDER_STATUS_ENUM } from './order.constant';

const createOrder = async (orderData: Order): Promise<IOrder> => {
  const { item, ...rest } = orderData;

  const order = (
    await OrderModel.create({
      item,
      ...rest,
    })
  ).populate([{ path: 'buyer', select: { password: 0 } }]);

  return order;
};

const createBalanceOrder = async (orderData: Order): Promise<any> => {
  const walletData = await WalletModel.findOne({ userId: orderData?.userId });

  const generateUniqueSessionId = () => {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 10000);
    return `cs_test_${timestamp}_${randomPart}`;
  };

  const generateUniquePaymentId = () => {
    const randomPart = Math.floor(Math.random() * 10000);
    return `balanceOrder_${randomPart}`;
  };

  const newBalance = Number(walletData?.balance) - Number(orderData.totalPrice);
  const updateWalletData = await WalletModel.findOneAndUpdate(
    {
      _id: walletData?._id,
    },
    {
      $set: {
        balance: newBalance,
      },
      $push: {
        transactions: {
          $each: [
            {
              type: 'ordered',
              amount: -orderData.totalPrice,
              paymentStatus: 'paid',
              isPaid: true,
              sessionId: generateUniqueSessionId(),
              paymentId: generateUniquePaymentId(),
              paidAt: new Date(),
            },
          ],
          $position: 0,
        },
      },
    },
    { new: true },
  );

  if (!updateWalletData?._id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to update wallet');
  }

  orderData.item.map(async (item) => {
    const newOrder = {
      item,
      userId: orderData.userId,
      totalPrice: orderData.totalPrice,
      buyer: orderData.buyer,
      paymeId: generateUniquePaymentId(),
    };

    await OrderModel.create(newOrder);
  });

  await CartModel.updateOne(
    { userId: orderData.userId },
    { $set: { items: [], totalPrice: 0, sessionId: '' } },
    { new: true },
  );

  return {
    sessionId: generateUniqueSessionId(),
    paymentId: generateUniquePaymentId(),
  };
};

const getAllOrder = async (
  filters: OrderFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IOrder[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(filters, paginationOption, ORDER_SEARCH_FIELDS);

  const result = await OrderModel.find(whereConditions)
    .populate([{ path: 'buyer', select: { password: 0 } }])
    .sort({ ...sortConditions, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await OrderModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getAcceptedOrder = async (
  filters: OrderFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IOrder[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(filters, paginationOption, ORDER_SEARCH_FIELDS);

  const result = await OrderModel.find({
    ...whereConditions,
    status: { $ne: 'pending' },
    partner: { $exists: false },
  })
    .populate([{ path: 'buyer', select: { password: 0 } }])
    .sort({ ...sortConditions, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await OrderModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const acceptOrder = async (orderId: string): Promise<IOrder> => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status: 'accepted' },
    { new: true },
  ).populate([{ path: 'buyer', select: { password: 0 } }]);

  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  return order;
};

const rejectOrder = async (orderId: string): Promise<IOrder> => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status: 'rejected' },
    { new: true },
  ).populate([{ path: 'buyer', select: { password: 0 } }]);

  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  return order;
};

const completeOrder = async (orderId: string): Promise<IOrder> => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status: 'completed' },
    { new: true },
  ).populate([{ path: 'buyer', select: { password: 0 } }]);

  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  return order;
};

const cancelOrder = async (orderId: string): Promise<IOrder> => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status: 'cancelled' },
    { new: true },
  ).populate([{ path: 'buyer', select: { password: 0 } }]);

  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  return order;
};

const getClaimAbleOrder = async (
  filters: OrderFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IOrder[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(filters, paginationOption, ORDER_SEARCH_FIELDS);

  const result = await OrderModel.find({
    ...whereConditions,
    status: { $ne: 'placed' },
    partner: { $exists: false },
  })
    .populate([{ path: 'buyer', select: { password: 0 } }])
    .sort({ ...sortConditions, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await OrderModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const updateOrder = async ({
  orderId,
  data,
}: {
  orderId: string;
  userId: string;
  data: Partial<IOrder>;
}) =>
  await OrderModel.findOneAndUpdate(
    { _id: orderId },
    { $set: data },
    { new: true },
  );

const getOrderByUserId = async (userId: string): Promise<IOrder[]> => {
  const orders = await OrderModel.find({ userId })
    .populate([{ path: 'buyer', select: { password: 0 } }])
    .sort({ createdAt: -1 })
    .exec();

  if (!orders) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');

  return orders;
};

const getOrderByPartnerId = async (partnerId: string): Promise<IOrder[]> => {
  const partner = await BoosterModel.findOne({ user: partnerId });
  const orders = await OrderModel.find({ partner: partner?._id })
    .populate([{ path: 'buyer', select: '-password' }])
    .sort({ createdAt: -1 })
    .exec();

  if (!orders) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');

  return orders;
};

const getOrderByOrderId = async (orderId: string): Promise<IOrder> => {
  const order = await OrderModel.findById(orderId).populate([
    { path: 'userId', select: '-password' },
  ]);
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  return order;
};

const getOrderReceived = async (userId: string): Promise<IOrder[]> => {
  const orders = await OrderModel.find({
    buyer: userId,
    status: { $ne: 'cancelled' },
  })
    .populate([{ path: 'buyer', select: { password: 0 } }])
    .sort({ createdAt: -1 });

  return orders;
};

const getOrderSent = async (userId: string): Promise<IOrder[]> => {
  const orders = await OrderModel.find({
    'item.seller': userId,
    status: { $ne: 'cancelled' },
  })
    .populate([{ path: 'buyer', select: { password: 0 } }])
    .sort({ createdAt: -1 });

  return orders;
};

const getOrderStats = async (): Promise<any> => {
  const stats = await OrderModel.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$totalPrice' },
      },
    },
  ]);

  return stats;
};

const getMyOrderStats = async (userId: string): Promise<any> => {
  const stats = await OrderModel.aggregate([
    {
      $match: {
        $or: [{ buyer: userId }, { 'item.seller': userId }],
      },
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$totalPrice' },
      },
    },
  ]);

  return stats;
};

const joinGroupChat = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  console.log('Joining group chat for order:', id);
  console.log('User ID:', userId);
  const isExisting = await OrderModel.findById(id)
    .populate('buyer', 'userId discordId')
    .populate('item.seller', 'userId discordId');

  if (!isExisting) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order not found');
  }

  if (!isExisting?.isChannelCreated) {
    const buyer = isExisting.buyer as any;
    const seller = isExisting.item[0].seller as any;

    if (!buyer.discordId || !seller.discordId) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Both buyer and seller must link their Discord accounts before creating a chat channel'
      );
    }

    // Create Discord channel and get invite
    const { channelId, invite } = await getDiscordChannelAndInvite({
      channelName: id,
      prefix: 'order',
      buyerId: buyer.discordId,
      sellerId: seller.discordId,
    });

    // Update order with channel info
    const result = await OrderModel.findByIdAndUpdate(
      id,
      {
        $set: {
          isChannelCreated: true,
          channelId: channelId,
          channelInviteUrl: invite,
        },
      },
      { new: true }
    );

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }

    return {
      channelId,
      inviteUrl: invite,
    };
  }

  return isExisting;
};

const assignBoosterToOrder = async (
  orderId: string,
  boosterId: string,
): Promise<IOrder | null> => {
  const order = await OrderModel.findById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const booster = await UserModel.findOne({ userId: boosterId, roles: { $in: [USER_ROLE_ENUM.BOOSTER] } });
  if (!booster) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booster not found or user is not a booster');
  }

  if (!booster.online) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booster is currently offline');
  }

  // Check if booster is already assigned to this order
  if (order.assignedBooster === boosterId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booster is already assigned to this order');
  }

  // Update order with assigned booster
  const updatedOrder = await OrderModel.findByIdAndUpdate(
    orderId,
    {
      $set: {
        assignedBooster: boosterId,
        status: ORDER_STATUS_ENUM.IN_PROGRESS,
      },
    },
    { new: true },
  );

  if (!updatedOrder) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to assign booster');
  }

  return updatedOrder;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  updateOrder,
  getOrderByUserId,
  getOrderByOrderId,
  joinGroupChat,
  createBalanceOrder,
  getOrderByPartnerId,
  getAcceptedOrder,
  getClaimAbleOrder,
  acceptOrder,
  rejectOrder,
  completeOrder,
  cancelOrder,
  getOrderReceived,
  getOrderSent,
  getOrderStats,
  getMyOrderStats,
  assignBoosterToOrder,
};
