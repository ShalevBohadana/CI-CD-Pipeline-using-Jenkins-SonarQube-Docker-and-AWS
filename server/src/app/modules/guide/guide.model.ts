import { model, Schema } from 'mongoose';

import { TGuideModel } from './guide.interface';
import { CreateGuide } from './guide.validation';

const GuideSchema = new Schema<CreateGuide>(
  {
    body: {
      title: {
        type: String,
        required: true,
      },
      uid: {
        type: String,
        required: true,
      },
      shortDescription: {
        type: String,
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      publishDate: {
        type: Date,
        required: true,
      },
      isFeatured: {
        type: Boolean,
        required: true,
      },
    }
  },
  { timestamps: true },
);

export const GuideModel = model<CreateGuide, TGuideModel>('Guide', GuideSchema);
