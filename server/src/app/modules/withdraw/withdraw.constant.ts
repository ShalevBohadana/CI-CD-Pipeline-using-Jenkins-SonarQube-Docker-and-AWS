export enum WITHDRAW_STATUS_ENUM {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export const WITHDRAW_FILTER_FIELDS = ['searchTerm', 'userId', 'status'];
export const WITHDRAW_SEARCHABLE_FIELDS = ['userId', 'status'];
