/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { URLSearchParams } from 'url'; // Add this import
import { Response } from 'express';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { Role } from '../../../enums/role';
import { generateUserId } from '../../helpers/generateUserId';
import generateUserName from '../../helpers/generateUserName';
import JwtHelper from '../../helpers/jwtHelper';
import { IUser } from '../user/user.interface';
import UserModel from '../user/user.model';
import { IUserResponse } from './auth.interface';
import CustomerModel from '../customer/customer.model';
import { DEFAULT_AVATAR_IMG } from '../user/user.model';

const generateTokens = async (
  userId: string,
  roles: Role[],
): Promise<{ accessToken: string; refreshToken: string }> => {
  const payload = {
    userId,
    roles,
  };

  const accessToken = JwtHelper.generateToken(payload);
  const refreshToken = JwtHelper.generateToken(payload);

  return {
    accessToken,
    refreshToken,
  };
};

const createSocialUser = async (userData: any, session: mongoose.ClientSession): Promise<IUser> => {
  const userId = await generateUserId(Role.CUSTOMER);
  const userName = generateUserName(userData.email || `${userId}@fullboosts.com`);

  const user = await UserModel.create(
    [
      {
        userId,
        userName,
        email: userData.email || `${userId}@fullboosts.com`,
        name: userData.name,
        avatar: userData.avatar || DEFAULT_AVATAR_IMG,
        roles: [Role.CUSTOMER],
        isEmailVerified: true,
      },
    ],
    { session },
  );

  return user[0];
};

const discordLogin = async (discordData: any): Promise<IUserResponse> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Exchange code for access token
    const tokenParams = new URLSearchParams({
      client_id: config.discord_oauth_client_id as string,
      client_secret: config.discord_oauth_secret as string,
      grant_type: config.discord_auth_grand_type as string,
      code: discordData.code,
      redirect_uri: config.discord_redirect_uri as string,
    });

    const tokenResponse = await axios.post(
      `${config.discord_exchange_base_uri}/oauth2/token`,
      tokenParams.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const { access_token } = tokenResponse.data;

    // Get user info from Discord
    const userResponse = await axios.get(
      `${config.discord_exchange_base_uri}/users/@me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const { id: discordId, email, username } = userResponse.data;

    // Check if user exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { discordId }],
    });

    if (existingUser) {
      // Update discord ID if not set
      if (!existingUser.discordId) {
        existingUser.discordId = discordId;
        await existingUser.save();
      }

      const { accessToken, refreshToken } = await generateTokens(
        existingUser.userId,
        existingUser.roles as Role[],
      );

      const userData = {
        _id: existingUser._id.toString(),
        userId: existingUser.userId,
        email: existingUser.email,
        online: existingUser.online,
        isEmailVerified: existingUser.isEmailVerified,
        roles: existingUser.roles,
        discordId: existingUser.discordId,
        userName: existingUser.userName,
        avatar: existingUser.avatar || '',
        reviews: existingUser.reviews || [],
        ban: existingUser.ban || false,
        history: existingUser.history || [],
      };

      await session.commitTransaction();
      session.endSession();

      return {
        accessToken,
        refreshToken,
        data: userData,
      };
    }

    const userData = {
      email,
      name: username,
      avatar: userResponse.data.avatar,
    };

    const user = await createSocialUser(userData, session);
    const { accessToken, refreshToken } = await generateTokens(user.userId, user.roles as Role[]);

    await session.commitTransaction();
    session.endSession();

    return {
      accessToken,
      refreshToken,
      data: {
        _id: user._id?.toString() || '',
        userId: user.userId,
        email: user.email,
        name: user.name,
        roles: user.roles,
        userName: user.userName,
        online: user.online,
        isEmailVerified: user.isEmailVerified,
        avatar: user.avatar,
        reviews: user.reviews || [],
        ban: user.ban || false,
        history: user.history || [],
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const googleLogin = async (googleData: any): Promise<IUserResponse> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData = {
      name: googleData.name,
      email: googleData.email,
      avatar: googleData.picture,
    };

    const user = await createSocialUser(userData, session);
    const { accessToken, refreshToken } = await generateTokens(user.userId, user.roles as Role[]);

    await session.commitTransaction();
    session.endSession();

    return {
      accessToken,
      refreshToken,
      data: {
        _id: user._id?.toString() || '',
        userId: user.userId,
        email: user.email,
        name: user.name,
        roles: user.roles,
        userName: user.userName,
        online: user.online,
        isEmailVerified: user.isEmailVerified,
        avatar: user.avatar,
        reviews: user.reviews || [],
        ban: user.ban || false,
        history: user.history || [],
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const facebookLogin = async (facebookData: any): Promise<IUserResponse> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData = {
      name: facebookData.name,
      email: facebookData.email,
      avatar: facebookData.picture.data.url,
    };

    const user = await createSocialUser(userData, session);
    const { accessToken, refreshToken } = await generateTokens(user.userId, user.roles as Role[]);

    await session.commitTransaction();
    session.endSession();

    return {
      accessToken,
      refreshToken,
      data: {
        _id: user._id?.toString() || '',
        userId: user.userId,
        email: user.email,
        name: user.name,
        roles: user.roles,
        userName: user.userName,
        online: user.online,
        isEmailVerified: user.isEmailVerified,
        avatar: user.avatar,
        reviews: user.reviews || [],
        ban: user.ban || false,
        history: user.history || [],
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const AuthSocialLoginService = {
  discordLogin,
  googleLogin,
  facebookLogin,
};
