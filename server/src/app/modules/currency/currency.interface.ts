/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface ICurrency {
  base: string;
  rates: {
    [key: string]: number;
  };
  timestamp: number;
}

export interface ICurrencyModel extends Model<ICurrency> {
  isExistCurrency(): Promise<ICurrency>;
}

export interface ICurrencyLiveRate {
  base: string;
  rates: {
    [key: string]: number;
  };
  timestamp: number;
}
