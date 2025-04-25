import httpStatus from 'http-status';
import cron from 'node-cron';

import ApiError from '../../errors/ApiError';
import CurrencyModel from '../modules/currency/currency.model';
import { CurrencyService } from '../modules/currency/currency.service';
import { OrderModel } from '../modules/order/order.model';

export const scheduleCornJobs = () => {
  cron.schedule('0 */1 * * *', async () => {
    try {
      const isExist = await CurrencyModel.findOne();
      const currency = await CurrencyService.liveCurrencyRate();
      if (!isExist) {
        const addedCurrency = await CurrencyModel.create(currency);
        if (!addedCurrency)
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            'Something went wrong while adding currency',
          );
      } else {
        const dataToUpdate = {
          rates: currency.rates,
          timestamp: currency.timestamp,
        };
        const updatedCurrency = await CurrencyModel.findOneAndUpdate(
          { _id: isExist._id },
          dataToUpdate,
          { new: true },
        );
        if (!updatedCurrency)
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            'Something went wrong while updating currency',
          );
      }
    } catch (error) {
      console.log(
        'Something went wrong while scheduling updating currency rates',
        error,
      );
    }
  });

  // update order status after every 10 mins
  cron.schedule('*/10 * * * *', async () => {
    try {
      // Find orders with status 'placed' that are older than 10 minutes
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      await OrderModel.updateMany(
        { status: 'placed', createdAt: { $lte: tenMinutesAgo } },
        { $set: { status: 'processing' } },
      );
    } catch (error) {
      console.error('Error updating orders:', error);
    }
  });
};
