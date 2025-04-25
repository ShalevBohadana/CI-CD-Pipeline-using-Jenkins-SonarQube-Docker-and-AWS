import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { BecomeCurrencySupplier } from './currencySupplier.validation';

export type TCurrencySupplierModel = Model<BecomeCurrencySupplier> & {
  findAll(): Promise<BecomeCurrencySupplier[]>;
};

export type CurrencySupplierFilters = Pretty<CommonFilters>;
