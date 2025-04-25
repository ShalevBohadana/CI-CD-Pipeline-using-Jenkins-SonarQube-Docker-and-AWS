// src/services/ticket.service.ts
import ApiError from '@/errors/ApiError';
import httpStatus from 'http-status';
import { Schema, SortOrder } from 'mongoose';
import { IPaginationOption } from '../../../interfaces/sharedInterface';
import { getDiscordChannelAndInvite } from '../order/order.helper';
import { Ticket, TicketFilters } from './ticket.interface';
import { TicketModel } from './ticket.model';

interface ICreateTicketOptions {
  userId: string;
  payload: Partial<Ticket>;
}

interface IUpdateTicketOptions {
  id: string;
  payload: Partial<Ticket>;
}

interface IDiscordChannelOptions {
  userId: string;
  id: string;
}

export class TicketService {
  static async createOne({
    userId,
    payload,
  }: ICreateTicketOptions): Promise<Ticket> {
    try {
      const ticketData: Partial<Ticket> = {
        ...payload,
        user: new Schema.Types.ObjectId(userId),
        status: 'placed' as const,
        isDelayed: false,
        isChannelCreated: false,
        inviteUrl: '',
      };

      const result = await TicketModel.create(ticketData);
      return result;
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create ticket');
    }
  }

  static async getMany(
    filters: TicketFilters,
    paginationOption: IPaginationOption,
  ) {
    const { search: searchTerm, ...filterData } = filters;
    const { page = 1, limit = 10, sortBy, sortOrder } = paginationOption;

    const skip = (page - 1) * limit;
    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }

    const whereConditions = [];

    if (searchTerm) {
      whereConditions.push({
        $or: ['category', 'issue'].map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }

    if (Object.keys(filterData).length) {
      whereConditions.push({
        ...filterData,
      });
    }

    const conditions =
      whereConditions.length > 0 ? { $and: whereConditions } : {};

    const total = await TicketModel.countDocuments(conditions);

    const result = await TicketModel.find(conditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)
      .populate('user')
      .populate('game');

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  }

  static async getOne(id: string): Promise<Ticket> {
    const result = await TicketModel.findById(id)
      .populate('user')
      .populate('game');

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
    }

    return result;
  }

  static async updateOne({
    id,
    payload,
  }: IUpdateTicketOptions): Promise<Ticket> {
    const result = await TicketModel.findByIdAndUpdate(id, payload, {
      new: true,
    })
      .populate('user')
      .populate('game');

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
    }

    return result;
  }

  static async deleteOne(id: string): Promise<Ticket> {
    const result = await TicketModel.findByIdAndDelete(id);

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
    }

    return result;
  }

  static async discordChannel({ userId, id }: IDiscordChannelOptions) {
    const ticket = await TicketModel.findOne({
      _id: id,
      user: new Schema.Types.ObjectId(userId),
    });

    if (!ticket) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
    }

    if (ticket.isChannelCreated) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Discord channel already exists for this ticket',
      );
    }

    const discordChannel = await getDiscordChannelAndInvite({
      channelName: `ticket-${ticket._id}`,
      prefix: 'support',
      buyerId: userId,
      sellerId: process.env.DISCORD_SUPPORT_ID || '',
    });

    const updatedTicket = await TicketModel.findByIdAndUpdate(
      ticket._id,
      {
        isChannelCreated: true,
        inviteUrl: discordChannel.invite,
      },
      { new: true },
    )
      .populate('user')
      .populate('game');

    if (!updatedTicket) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update ticket with Discord information',
      );
    }

    return {
      ticket: updatedTicket,
      channelInfo: discordChannel,
    };
  }
}

export default TicketService;
