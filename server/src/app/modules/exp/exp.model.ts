/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from 'mongoose';

import { IExp, IExpModel } from './exp.interface';

const expSchema = new Schema<IExp>(
  {
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
      unique: true,
    },
    exp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

expSchema.statics.findByRating = async function (
  rating: number,
): Promise<IExp | null> {
  const exp = await this.findOne({ rating });
  return exp;
};

const ExpModel = model<IExp, IExpModel>('Exp', expSchema);
export default ExpModel;
