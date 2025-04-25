import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { CreateGuide } from './guide.validation';

export type TGuideModel = Model<CreateGuide> & {
  findAll(): Promise<CreateGuide[]>;
};

export type GuideFilters = Pretty<CommonFilters>;
