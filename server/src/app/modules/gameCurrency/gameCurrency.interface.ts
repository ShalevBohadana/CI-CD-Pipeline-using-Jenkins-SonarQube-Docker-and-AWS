import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { GameCurrency } from './gameCurrency.validation';

export type TGameCurrencyModel = Model<GameCurrency> & {
  // eslint-disable-next-line no-unused-vars
  isExisting(uid: string): Promise<GameCurrency>;
};

export type GameCurrencyFilters = Pretty<
  CommonFilters & {
    uid?: string;
    name?: string;
    title?: string;
  }
>;
