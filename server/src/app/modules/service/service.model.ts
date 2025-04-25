import { model, Schema } from 'mongoose';

import { IService, IServiceModel } from './service.interface';

// const optionSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//     },
//   },
//   { _id: false }
// )

const serviceSchema = new Schema<IService>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    details: {
      type: String,
      required: true,
    },
    benefitPoint: {
      type: String,
      required: true,
    },
    additionalPoint: {
      type: String,
      required: true,
    },
    requirementPoint: {
      type: String,
      required: true,
    },
    howItWorks: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    serviceFee: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Service filter options
    filters: {
      // region: {
      //   type: [String],
      //   required: true,
      // },
      // faction: {
      //   type: [String],
      //   required: true,
      // },
      // boostMethod: {
      //   type: [String],
      //   required: true,
      // },
      // executionOption: [optionSchema],
      // additionalOption: [optionSchema],
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
);

serviceSchema.statics.isExistingService = async function (
  sku: string,
): Promise<IService | null> {
  const service = await ServiceModel.findOne({ sku });
  return service;
};

serviceSchema.statics.isExistingServiceTitle = async function (
  title: string,
): Promise<IService | null> {
  const service = await ServiceModel.findOne({ title });
  return service;
};

const ServiceModel = model<IService, IServiceModel>('Service', serviceSchema);
export default ServiceModel;
