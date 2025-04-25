import { Model } from 'mongoose';

import { CommonFilters } from '../../helpers/pagination';
import { Payment } from './payment.validation';

export type PaymentModelExtended = Model<Payment> & object;

export type PaymentFilters = CommonFilters;
