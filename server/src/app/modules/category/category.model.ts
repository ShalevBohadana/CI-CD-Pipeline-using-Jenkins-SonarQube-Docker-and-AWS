import { model, Schema } from 'mongoose';

import { ICategory, ICategoryModel } from './category.interface';

const categorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
  },
  { timestamps: true },
);

categorySchema.statics.isExistingCategory = async function (
  title: string,
): Promise<ICategory | null> {
  const category = Category.findOne({ title });
  return category;
};

const Category = model<ICategory>('Category', categorySchema);
export default Category;
