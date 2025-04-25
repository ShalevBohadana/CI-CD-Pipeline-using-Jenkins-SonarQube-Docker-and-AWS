import { EXISTING_USER_FILTER_FIELD } from '../modules/user/user.constant';

export const filterConditionGenerator = (userData: string) => {
  const andConditions = [];
  if (EXISTING_USER_FILTER_FIELD.length) {
    andConditions.push({
      $or: EXISTING_USER_FILTER_FIELD.map((field) => ({
        [field]: userData,
      })),
    });
  }

  // andConditions.push({ ban: false });

  const whereCondition = andConditions.length ? { $and: andConditions } : {};
  return whereCondition;
};
