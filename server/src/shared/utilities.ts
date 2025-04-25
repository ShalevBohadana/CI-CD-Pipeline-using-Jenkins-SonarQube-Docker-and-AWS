// import { Model, SortOrder } from 'mongoose';
// import paginationHelper from '../app/helpers/paginationHelper';
// import {
//   IGenericDataWithMeta,
//   IPaginationOption,
// } from '../interfaces/sharedInterface';

export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const resultObj = { ...obj };

  keys.forEach((key) => {
    if (resultObj && Object.prototype.hasOwnProperty.call(resultObj, key)) {
      delete resultObj[key];
    }
  });

  return resultObj as Omit<T, K>;
};

// export const getPaginateddData = async <T>(
//   model: Model<T>,
//   paginationOption: IPaginationOption
// ): Promise<IGenericDataWithMeta<T[]>> => {
//   const { page, limit, skip, sortBy, sortOrder, category, search } =
//     paginationHelper(paginationOption);

//   const sortCondition: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortCondition[sortBy] = sortOrder;
//   }

//   const filter: { categories?: string; name?: string } = {};
//   if (category) {
//     filter.categories = category;
//   }
//   if (search) {
//     filter.name = search;
//   }

//   const result = await model
//     .find(filter)
//     .sort(sortCondition)
//     .skip(skip)
//     .limit(limit as number)
//     .select({
//       __v: 0,
//     });
//   const total = await model.countDocuments();

//   const responseData = {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };

//   return responseData;
// };

/**
 * The `kebabCasedUrl` function takes a string input and converts it to a URL-friendly format by
 * removing unwanted characters and replacing spaces with hyphens.
 * @param {string} input - The `input` parameter is a string that represents the input URL that needs
 * to be converted to kebab case.
 * @returns a string that has been converted to kebab case.
 */
export const kebabCasedUrl = (input: string): string => {
  // Remove unwanted characters and replace spaces with hyphens
  const urlFriendly = input
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-{2,}/g, '-'); // Replace consecutive hyphens with a single hyphen

  return urlFriendly;
};

/**
 * The function `cookieToObject` takes a string of cookies and converts it into an object where the
 * keys are the cookie names and the values are the cookie values.
 * @param {string} payload - The `payload` parameter is a string that represents a cookie.
 * @returns The function `cookieToObject` returns an object that represents the cookies parsed from the
 * `payload` string.
 */
export const cookieToObject = (payload: string) =>
  payload.split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

/**
 * The function getRandomHexString generates a random hexadecimal string of a specified size.
 * @param [size=10] - The `size` parameter determines the length of the random hexadecimal string that
 * will be generated. By default, if no value is provided for `size`, it will be set to 10.
 */
export const getRandomHexString = (size = 10) =>
  Array.from({ length: size }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join('');
