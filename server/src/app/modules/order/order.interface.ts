import { Model, ObjectId } from 'mongoose';
import { CommonFilters } from '../../helpers/pagination';

export interface IOrderItem {
  itemType: 'regular' | 'currency';
  itemId: number;
  seller: ObjectId;
  offerId: ObjectId;
  offerName: string;
  offerImage: string;
  selected:
    | {
        name: string;
        value: string;
      }
    | {
        from: string;
        to: string;
      };
}

export interface IOrder {
  _id: ObjectId;
  userId: ObjectId;
  item: IOrderItem[];
  totalPrice: number;
  payment: string;
  isPaymentConfirmed: boolean;
  paymentId?: string;
  paymeId?: string;
  sessionId?: string;
  status: string;
  buyer: ObjectId;
  assignedBooster?: string;
  isChannelCreated: boolean;
  channelId?: string;
  channelInviteUrl?: string;
  partner?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  // שדות נוספים מהסכמה
  isApproved: boolean;
  inviteLink?: string;
  inviteUrl?: string;
  isConfirmedByClient: boolean;
  isConfirmedByPartner: boolean;
}

export interface OrderFilters extends CommonFilters {
  searchTerm?: string;
  status?: string;
  buyer?: string;
  partner?: string;
}

export interface OrderModelExtended extends Model<IOrder> {
  findByBuyerId(buyerId: string): Promise<IOrder[]>;
  findByStatus(status: string): Promise<IOrder[]>;
  findByPartner(partnerId: string): Promise<IOrder[]>;
}

export type IOrderModel = Model<IOrder, Record<string, unknown>>;

export enum OrderStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export const PaymentStatusArray = [
  'no_payment_required',
  'paid',
  'unpaid',
] as const;

export type PaymentStatus = (typeof PaymentStatusArray)[number];

export const SessionStatusArray = ['complete', 'expired', 'open'] as const;

export type SessionStatus = (typeof SessionStatusArray)[number];

export class OrderError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400,
  ) {
    super(message);
    this.name = 'OrderError';
  }
}
