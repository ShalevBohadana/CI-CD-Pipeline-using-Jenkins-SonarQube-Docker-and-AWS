import bcrypt from 'bcryptjs'; // שינוי ל-bcryptjs

import { IUser } from '../modules/user/user.interface';

export const comparePassword = async (
  userToBeCompared: IUser,
  givenPassword: string,
): Promise<boolean> => {
  if (!userToBeCompared || !userToBeCompared.password) {
    return false;
  }

  const isPasswordMatch = await bcrypt.compare(
    givenPassword,
    userToBeCompared.password as string,
  );

  return isPasswordMatch;
};
