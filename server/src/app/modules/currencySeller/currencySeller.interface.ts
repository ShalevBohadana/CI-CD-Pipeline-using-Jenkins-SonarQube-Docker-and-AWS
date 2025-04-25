import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { BecomeCurrencySeller } from './currencySeller.validation';

export type TCurrencySellerModel = Model<BecomeCurrencySeller> & {
  findAll(): Promise<BecomeCurrencySeller[]>;
};

export type CurrencySellerFilters = Pretty<CommonFilters>;
