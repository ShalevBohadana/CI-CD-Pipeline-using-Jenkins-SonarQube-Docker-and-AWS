import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { CreateGame } from './game.validation';

export type IUpdateGame = Pretty<
  Partial<CreateGame> & {
    _id: string;
  }
>;

export interface IGameModel extends Model<CreateGame> {
  // eslint-disable-next-line no-unused-vars
  isExistingGame(title: string): Promise<CreateGame>;
}

export type GameFilters2 = Pretty<
  CommonFilters & {
    uid?: string;
    name?: string;
    title?: string;
  }
>;
