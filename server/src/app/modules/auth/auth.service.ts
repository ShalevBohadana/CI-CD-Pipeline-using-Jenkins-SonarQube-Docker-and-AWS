import httpStatus from 'http-status';
import jwt, { Secret } from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs'
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { generateUserId } from '../../helpers/generateUserId';
import generateUserName from '../../helpers/generateUserName';
import JwtHelper from '../../helpers/jwtHelper';
import { IAdmin, IAdminAttributes, IAdminWithToken } from '../admin/admin.interface';
import AdminModel from '../admin/admin.model';
import CustomerModel from '../customer/customer.model';
import { IOwnerFullData } from '../owner/owner.interface';
import OwnerModel from '../owner/owner.model';
import { IUser } from '../user/user.interface';
import UserModel, { DEFAULT_AVATAR_IMG } from '../user/user.model';
import { ILoginUser, IUserResponse } from './auth.interface';
import { Role } from '../../../enums/role';
import { hashPassword } from '../../helpers/hashPassword';
import { ISupport } from '../support/support.interface';
import SupportModel from '../support/support.model';
import { IPartner } from '../partner/partner.interface';
import PartnerModel from '../partner/partner.model';
import { JwtPayloadExtended } from '../../helpers/jwtHelper';
import { sendEmailVerification } from '../../../shared/sendEmailVerification';

const convertToRoleType = (roles: string[]): Role[] => {
  return roles.map((role) => role as Role);
};

const generateTokens = async (
  userId: string,
  roles: Role[],
): Promise<{ accessToken: string; refreshToken: string }> => {
  const basePayload: JwtPayloadExtended = {
    userId,
    roles,
    version: 1
  };

  const accessToken = JwtHelper.generateToken(
    { ...basePayload, type: 'access' as const },
    config.access_token,
    config.access_token_expires_in as `${number}h`
  );
  
  const refreshToken = JwtHelper.generateToken(
    { ...basePayload, type: 'refresh' as const },
    config.refresh_token,
    config.refresh_token_expires_in as `${number}d`
  );

  return {
    accessToken,
    refreshToken,
  };
};

const signupCustomer = async (
  customerData: Partial<IUser>,
): Promise<IUserResponse> => {
  try {
    if (!customerData.email) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email: customerData.email });
    if (existingUser) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'Email already exists. Please use a different email or try logging in.'
      );
    }

    const id = await generateUserId(Role.CUSTOMER);
    const userName = generateUserName(customerData.email);

    // Hash password
    if (!customerData.password) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password is required');
    }
    const hashedPassword = await hashPassword(customerData.password);

    // Set email verification based on environment
    const isEmailVerified = process.env.NODE_ENV === 'development' || false;

    const user = await UserModel.create({
      ...customerData,
      userId: id,
      userName,
      password: hashedPassword,
      role: Role.CUSTOMER,
      online: false,
      isEmailVerified,
      avatar: DEFAULT_AVATAR_IMG,
      reviews: [],
      ban: false,
      history: [
        {
          action: 'account_created',
          timestamp: new Date(),
        },
      ],
    });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create user');
    }

    const customer = await CustomerModel.create({ id });
    if (!customer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create customer');
    }

    // Only attempt email verification in production
    if (process.env.NODE_ENV !== 'development') {
      try {
        await sendEmailVerification(user, user.email);
      } catch (error) {
        console.error('Failed to send verification email:', error);
        // Don't fail registration if email fails
      }
    }

    const { accessToken, refreshToken } = await generateTokens(
      user.userId,
      convertToRoleType([Role.CUSTOMER])
    );

    return {
      accessToken,
      refreshToken,
      data: {
        _id: user._id.toString(),
        userId: user.userId,
        email: user.email,
        name: user.name,
        roles: [Role.CUSTOMER],
        userName: user.userName,
        online: false,
        isEmailVerified: user.isEmailVerified,
        avatar: DEFAULT_AVATAR_IMG,
        reviews: [],
        ban: false,
        history: [
          {
            action: 'account_created',
            timestamp: new Date(),
          },
        ],
      },
    };
  } catch (error) {
    throw error;
  }
};

const loginUser = async (payload: ILoginUser): Promise<IUserResponse> => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email or password is missing');
  }

  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const { accessToken, refreshToken } = await generateTokens(
    user._id.toString(),
    user.roles as Role[]
  );

  return {
    accessToken,
    refreshToken,
    data: user.toObject(),
  };
};

const loginAdmin = async (
  payload: Pick<IAdminAttributes, 'email' | 'password'>
): Promise<IAdminWithToken> => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email or password is missing');
  }

  const admin = (await AdminModel.findOne({ email }).select('+password')) as IAdmin | null;
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const accessToken = JwtHelper.generateToken({
    userId: (admin._id as Types.ObjectId).toString(),
    roles: [admin.role],
  });

  const adminDoc = admin.toObject();
  const adminResponse: IAdminWithToken = {
    _id: (adminDoc._id as Types.ObjectId).toString(),
    name: adminDoc.name,
    email: adminDoc.email,
    userName: adminDoc.userName,
    contactNumber: adminDoc.contactNumber,
    address: adminDoc.address,
    isVerified: adminDoc.isVerified,
    profilePicture: adminDoc.profilePicture,
    online: adminDoc.online,
    isEmailVerified: adminDoc.isEmailVerified,
    role: adminDoc.role,
    accessToken,
  };

  return adminResponse;
};

const createAdmin = async (adminInput: Partial<IAdminAttributes>): Promise<IAdminWithToken> => {
  try {
    if (!adminInput.password) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password is required');
    }

    const hashedPassword = await hashPassword(adminInput.password);

    const userName = generateUserName(adminInput.email || '');

    const newAdmin = await AdminModel.create({
      ...adminInput,
      password: hashedPassword,
      userName,
      role: Role.ADMIN,
      isVerified: true,
      online: false,
      isEmailVerified: false,
    });

    const accessToken = JwtHelper.generateToken({
      userId: (newAdmin._id as Types.ObjectId).toString(),
      roles: [Role.ADMIN],
    });

    const adminResponse: IAdminWithToken = {
      _id: (newAdmin._id as Types.ObjectId).toString(),
      name: newAdmin.name,
      email: newAdmin.email,
      userName: newAdmin.userName,
      contactNumber: newAdmin.contactNumber,
      address: newAdmin.address,
      isVerified: newAdmin.isVerified,
      profilePicture: newAdmin.profilePicture,
      online: newAdmin.online,
      isEmailVerified: newAdmin.isEmailVerified,
      role: newAdmin.role,
      accessToken,
    };

    return adminResponse;
  } catch (error) {
    throw error;
  }
};

const signupOwner = async (ownerData: any): Promise<IUserResponse> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateUserId(Role.OWNER);
    const userName = generateUserName(ownerData.email);

    ownerData.userId = id;
    ownerData.role = Role.OWNER;
    ownerData.userName = userName;

    const user = await UserModel.create([ownerData], { session });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create user');
    }

    const owner = await OwnerModel.create([{ id }], { session });
    if (!owner) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create owner');
    }

    const { accessToken, refreshToken } = await generateTokens(id, [Role.OWNER]);

    await session.commitTransaction();
    session.endSession();

    return {
      accessToken,
      refreshToken,
      data: {
        _id: user[0]._id.toString(),
        userId: id,
        email: ownerData.email,
        name: ownerData.name,
        roles: [Role.OWNER],
        userName,
        online: false,
        isEmailVerified: false,
        avatar: DEFAULT_AVATAR_IMG,
        reviews: [],
        ban: false,
        history: [
          {
            action: 'account_created',
            timestamp: new Date(),
          },
        ],
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const createSupport = async (supportData: any): Promise<IUser> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateUserId(Role.SUPPORT);
    const userName = generateUserName(supportData.email);

    supportData.userId = id;
    supportData.role = Role.SUPPORT;
    supportData.userName = userName;

    const user = await UserModel.create([supportData], { session });
    if (!user || user.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create user');
    }

    const support = await SupportModel.create([{ id }], { session });
    if (!support || support.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create support');
    }

    await session.commitTransaction();
    session.endSession();
    return user[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const createPartner = async (partnerData: any): Promise<IUserResponse> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateUserId(Role.PARTNER);
    const userName = generateUserName(partnerData.email);

    const userData = {
      ...partnerData,
      userId: id,
      role: Role.PARTNER,
      userName,
      roles: [Role.PARTNER],
      online: false,
      isEmailVerified: false,
      ban: false,
      history: [
        {
          action: 'account_created',
          timestamp: new Date(),
        },
      ],
    };

    const user = await UserModel.create([userData], { session });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create user');
    }

    const partner = await PartnerModel.create([{
      id,
      isVerified: true,
      isSocialLogin: false,
    }], { session });

    if (!partner) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create partner');
    }

    const { accessToken, refreshToken } = await generateTokens(id, [Role.PARTNER]);

    await session.commitTransaction();
    session.endSession();

    return {
      accessToken,
      refreshToken,
      data: {
        _id: user[0]._id.toString(),
        userId: id,
        email: userData.email,
        name: userData.name,
        roles: [Role.PARTNER],
        userName,
        online: false,
        isEmailVerified: false,
        avatar: DEFAULT_AVATAR_IMG,
        reviews: [],
        ban: false,
        history: [
          {
            action: 'account_created',
            timestamp: new Date(),
          },
        ],
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const userLogin = async (userData: ILoginUser): Promise<IUserResponse> => {
  const { email, password } = userData;

  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email or password is missing');
  }

  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const { accessToken, refreshToken } = await generateTokens(user.userId, user.roles);

  return {
    accessToken,
    refreshToken,
    data: {
      _id: user._id.toString(),
      userId: user.userId,
      email: user.email,
      name: user.name,
      roles: user.roles,
      userName: user.userName,
      online: user.online,
      isEmailVerified: user.isEmailVerified,
      avatar: user.avatar,
      reviews: user.reviews,
      ban: user.ban,
      history: user.history,
    },
  };
};

const loggedInUser = async (token: string): Promise<IUser> => {
  const decoded = await JwtHelper.verifyToken(token);

  const user = await UserModel.findOne({ userId: decoded.userId })
    .select('-password -createdAt -updatedAt -__v');

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.ban) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Account is banned');
  }

  return user;
};

const verifyEmail = async (token: string): Promise<Pick<IUser, 'isEmailVerified'>> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const decoded = jwt.verify(token, config.email_verify_token) as jwt.JwtPayload & { email: string };

    const existingUser = await UserModel.findOne({ email: decoded.email });
    if (!existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (!existingUser.isEmailVerified) {
      existingUser.isEmailVerified = true;
      await existingUser.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
    return { isEmailVerified: existingUser.isEmailVerified };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const regenerateAccessTokenWithRefresh = async (refreshToken: string): Promise<string> => {
  try {
    // Verify the refresh token
    const decoded = await JwtHelper.verifyToken(refreshToken, 'refresh');
    
    if (!decoded.userId || !decoded.roles || !decoded.version) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token structure');
    }

    // Generate new tokens with an incremented version
    const payload: JwtPayloadExtended = {
      userId: decoded.userId,
      roles: decoded.roles,
      version: (decoded.version || 1) + 1,
      type: 'access'
    };

    // Generate new access token
    const newAccessToken = JwtHelper.generateToken(
      payload,
      config.access_token,
      config.access_token_expires_in as `${number}h`
    );

    // Blacklist the old refresh token to prevent reuse
    JwtHelper.blacklistToken(refreshToken);

    return newAccessToken;
  } catch (error: any) {
    if (error.message === 'Token has been revoked') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token has been revoked');
    }
    if (error.message === 'Token has expired') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token has expired');
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
  }
};

export const AuthService = {
  signupCustomer,
  loginUser,
  loginAdmin,
  createAdmin,
  generateTokens,
  signupOwner,
  createSupport,
  createPartner,
  userLogin,
  loggedInUser,
  verifyEmail,
  regenerateAccessTokenWithRefresh,
};
