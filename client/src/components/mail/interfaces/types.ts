export interface EmailHistoryEntry {
  id: string;
  timestamp: string | number | Date;
  type: string;
  recipient: string;
  subject: string;
  status: 'sent' | 'failed';
}
