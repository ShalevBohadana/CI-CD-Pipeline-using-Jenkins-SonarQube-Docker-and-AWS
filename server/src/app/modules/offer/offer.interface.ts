import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { RegularOffer } from './offer.validation';

export type OfferModel = Model<RegularOffer> & {
  // eslint-disable-next-line no-unused-vars
  isExisting(uid: string): Promise<RegularOffer>;
};
// export interface OfferModel extends Model<RegularOffer> {
//   // eslint-disable-next-line no-unused-vars
//   isExisting(uid: string): Promise<RegularOffer>;
// }
export type OfferFilters2 = Pretty<
  CommonFilters & {
    uid?: string;
    name?: string;
    title?: string;
  }
>;
