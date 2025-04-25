import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { NewsletterModel } from './newsletter.model';
import { Newsletter } from './newsletter.validation';

const subscribeToNewsletter = async (payload: Newsletter) => {
  let isExisting = await NewsletterModel.findOne({ email: payload.email });

  if (isExisting) {
    isExisting.isSubscribed = true;
    isExisting.unsubscribedAt = undefined;
  }

  if (!isExisting) {
    // If cart doesn't exist, create a new one
    isExisting = await NewsletterModel.create({
      ...payload,
    });
  }

  await isExisting.save();

  return isExisting;
};
const unsubscribeFromNewsletter = async ({ email }: Newsletter) => {
  const result = await NewsletterModel.findOne({ email });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription not found');
  }

  // Remove the item
  result.subscribedAt = undefined;
  result.unsubscribedAt = new Date();
  result.isSubscribed = false;

  await result.save();

  return result;
};

export const NewsletterService = {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
};
