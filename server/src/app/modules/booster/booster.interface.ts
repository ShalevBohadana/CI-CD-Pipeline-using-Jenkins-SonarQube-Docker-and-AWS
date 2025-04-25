import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { BecomeBooster } from './booster.validation';

// export interface IBooster {
//   email: string;
//   discordTag: string;
//   telegramUsername: string;
//   providedServices: Types.ObjectId[];
//   devoteTime: string;
//   isApproved: string;
// }

export type TBoosterModel = Model<BecomeBooster> & {
  findAll(): Promise<BecomeBooster[]>;
};

export type BoosterFilters = Pretty<CommonFilters>;
