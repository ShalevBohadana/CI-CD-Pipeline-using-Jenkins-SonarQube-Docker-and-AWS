import axios from 'axios';
import httpStatus from 'http-status';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { ICurrency, ICurrencyLiveRate } from './currency.interface';
import CurrencyModel from './currency.model';

const addCurrency = async (currencyData: ICurrency): Promise<ICurrency> => {
  const isCurrencyExist = await CurrencyModel.isExistCurrency();
  if (isCurrencyExist)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Currency already exist');

  const currency = await CurrencyModel.create(currencyData);
  if (!currency)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while creating currency',
    );
  return currency;
};

const getAllCurrency = async (): Promise<ICurrency> => {
  const currencies = await CurrencyModel.findOne();
  if (!currencies)
    throw new ApiError(httpStatus.NOT_FOUND, 'No currency found');
  return currencies;
};

const getCurrencyById = async (currencyId: string): Promise<ICurrency> => {
  const currency = await CurrencyModel.findById(currencyId);
  if (!currency) throw new ApiError(httpStatus.NOT_FOUND, 'Currency not found');
  return currency;
};

const updateCurrency = async (
  currencyId: string,
  currencyData: Partial<ICurrency>,
): Promise<ICurrency> => {
  const currency = await getCurrencyById(currencyId);
  if (!currency) throw new ApiError(httpStatus.NOT_FOUND, 'Currency not found');

  const updatedCurrency = await CurrencyModel.findOneAndUpdate(
    { _id: currencyId },
    currencyData,
    { new: true },
  ).lean(); // הוספת lean()

  if (!updatedCurrency)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while updating currency',
    );
  return updatedCurrency as ICurrency;
};

const deleteCurrency = async (currencyId: string): Promise<ICurrency> => {
  const currency = await getCurrencyById(currencyId);
  if (!currency) throw new ApiError(httpStatus.NOT_FOUND, 'Currency not found');

  const deletedCurrency = await CurrencyModel.findOneAndDelete({
    _id: currencyId,
  }).lean(); // הוספת lean()

  if (!deletedCurrency)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while deleting currency',
    );
  return deletedCurrency as ICurrency;
};

const liveCurrencyRate = async (): Promise<ICurrencyLiveRate> => {
  const response = await axios.get(
    `https://openexchangerates.org/api/latest.json?base=USD&app_id=${
      config.currency_secret as string
    }&base=USD&symbols=EUR,USD`,
  );
  const { data } = response;
  const objectToPush = {
    base: data.base,
    rates: data.rates,
    timestamp: data.timestamp,
  };
  return objectToPush;
};

export const CurrencyService = {
  addCurrency,
  getAllCurrency,
  getCurrencyById,
  updateCurrency,
  deleteCurrency,
  liveCurrencyRate,
};
