import { Model } from 'mongoose';

import { CommonFilters } from '../../helpers/pagination';
import { OrderReview } from './orderReview.validation';

export type OrderReviewModelExtended = Model<OrderReview> & {
  getOrderReviewById(id: string): Promise<OrderReview>;
};

export type OrderReviewFilters = CommonFilters;
