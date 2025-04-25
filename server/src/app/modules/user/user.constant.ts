/* eslint-disable no-unused-vars */
import { Role } from '../../../enums/role';

export type UserRole = Role;

export const USER_ROLE_ARRAY: string[] = Object.values(Role);

export const EXISTING_USER_FILTER_FIELD = ['userId', 'email', 'userName'];

export const USER_SEARCH_FIELDS = [
  'name',
  'email',
  'phone',
  'userName',
  'userId',
  'role',
];
export const USER_FILTER_FIELDS = [
  'role',
  'isVerified',
  'email',
  'userName',
  'userId',
];
