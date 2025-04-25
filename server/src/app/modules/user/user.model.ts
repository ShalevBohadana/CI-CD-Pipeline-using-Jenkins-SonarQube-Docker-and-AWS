/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import { model, Schema, Document } from 'mongoose';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { getRandomHexString } from '../../../shared/utilities';
import { filterConditionGenerator } from '../../helpers/filterConditionGenerator';
import { IUser, IUserModel } from './user.interface';
import { Role } from '../../../enums/role';

export const DEFAULT_AVATAR_IMG =
  `https://www.gravatar.com/avatar/${getRandomHexString()}?s=48&d=identicon&r=G` as const;
const userSchema = new Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
        min: 3,
      },
      lastName: {
        type: String,
        min: 3,
      },
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    history: [
      {
        action: String,
        timestamp: { type: Date, default: Date.now },
        details: Schema.Types.Mixed,
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    online: {
      type: Boolean,
      required: true,
      default: false,
    },
    discordId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    roles: {
      type: [String],
      required: true,
      enum: Object.values(Role),
      default: [Role.CUSTOMER],
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR_IMG,
    },
    userName: {
      type: String,
      unique: true,
      min: 3,
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: 'OrderReview',
      default: [],
    },
    ban: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this as IUser;
  // const isExistWithSameEmail = await UserModel.findOne({ email: user.email });
  // const isExistWithSameUserName = await UserModel.findOne({
  //   userName: user.userName,
  // });
  // if (isExistWithSameEmail)
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'Account with this email already exist'
  //   );
  // if (isExistWithSameUserName)
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'Account with this username already exist'
  //   );

  // Hash user password
  if (this?.password) {
    this.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    );
  }
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const user = this as any;
  if (user._update.password) {
    user._update.password = await bcrypt.hash(
      user._update.password,
      Number(config.bcrypt_salt_round),
    );
  }

  if (user._update.email) {
    const isExistWithSameEmail = await UserModel.findOne({
      email: user._update.email,
    });
    if (isExistWithSameEmail)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Account with this email already exist',
      );
  }

  if (user._update.userName) {
    const isExistWithSameUserName = await UserModel.findOne({
      userName: user._update.userName,
    });
    if (isExistWithSameUserName)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Account with this username already exist',
      );
  }
  next();
});

userSchema.statics.isUserExist = async function (
  userData: string,
): Promise<IUser | null> {
  const user = await UserModel.findOne(filterConditionGenerator(userData));
  return user;
};

const UserModel = model<IUser, IUserModel>('User', userSchema);
export default UserModel;
