import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { CreatePromo } from './promo.validation';

export type UpdatePromo = Pretty<
  Partial<CreatePromo> & {
    _id: string;
  }
>;
export type PromoFilters = Pretty<
  CommonFilters & {
    status?: string;
    code?: string;
  }
>;

export type TPromoModel = Model<CreatePromo> & {
  // eslint-disable-next-line no-unused-vars
  isExistingPromo(code: string): Promise<CreatePromo>;
};
