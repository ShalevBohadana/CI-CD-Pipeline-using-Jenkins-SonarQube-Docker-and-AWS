import { Model, Schema } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { CreateTicket } from './ticket.validation';

export type Ticket = Pretty<
  CreateTicket & {
    status: 'placed' | 'processing' | 'completed';
    isDelayed: boolean;
    user: Schema.Types.ObjectId;
    isChannelCreated: boolean;
    inviteUrl: string;
  }
>;
export type TTicketModel = Model<Ticket> & {
  findAll(): Promise<Ticket[]>;
};

export type TicketFilters = Pretty<CommonFilters>;
