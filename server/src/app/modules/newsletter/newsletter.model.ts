import { model, Schema } from 'mongoose';

import { TNewsletterModel } from './newsletter.interface';
import { Newsletter } from './newsletter.validation';

export const newsletterSchema = new Schema<Newsletter>(
  {
    email: { type: String, required: true, unique: true },
    subscribedAt: {
      type: Date || undefined,
      default: new Date(),
    },
    isSubscribed: { type: Boolean, required: true, default: true },
    unsubscribedAt: {
      type: Date || undefined,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
);

export const NewsletterModel = model<Newsletter, TNewsletterModel>(
  'Newsletter',
  newsletterSchema,
);
