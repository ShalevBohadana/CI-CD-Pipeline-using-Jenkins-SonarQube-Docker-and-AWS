// src/modules/mailing/mailing.model.ts
import { model, Schema } from 'mongoose';

import { EmailType, IEmailLog } from './mailing.interface';

const emailTypes: EmailType[] = [
  'verification',
  'order',
  'report',
  'password_reset',
  'welcome',
];

const EmailLogSchema = new Schema<IEmailLog>(
  {
    to: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['success', 'failed'],
    },
    error: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    emailType: {
      type: String,
      enum: emailTypes,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

EmailLogSchema.index({ createdAt: -1 });
EmailLogSchema.index({ emailType: 1 });
EmailLogSchema.index({ status: 1 });

const EmailLog = model<IEmailLog>('EmailLog', EmailLogSchema);

export default EmailLog;
