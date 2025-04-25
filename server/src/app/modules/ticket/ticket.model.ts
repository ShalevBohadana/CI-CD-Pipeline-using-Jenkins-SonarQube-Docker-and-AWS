import { model, Schema } from 'mongoose';

import { Ticket, TTicketModel } from './ticket.interface';

const TicketSchema = new Schema<Ticket>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    game: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    status: {
      type: String,
      enum: ['placed', 'processing', 'completed'],
      default: 'placed',
    },
    category: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    isDelayed: {
      type: Boolean,
      default: false,
    },
    isChannelCreated: {
      type: Boolean,
      default: false,
    },
    inviteUrl: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: true },
);

export const TicketModel = model<Ticket, TTicketModel>('Ticket', TicketSchema);
