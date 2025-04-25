import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import type { OfferGameCurrency } from './offerGameCurrency.validation';

export type TOfferGameCurrencyModel = Model<OfferGameCurrency> & {
  // eslint-disable-next-line no-unused-vars
  isExisting(uid: string): Promise<OfferGameCurrency>;
};

export type OfferGameCurrencyFilters = Pretty<
  CommonFilters & {
    uid?: string;
    name?: string;
    title?: string;
  }
>;
