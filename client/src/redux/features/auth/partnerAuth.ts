import { Credentials } from './authSlice';

export type PartnerRegistrationData = Credentials & {
  role: string;
  contactNumber?: string;
  isVerified?: boolean;
};

export type PartnerFormInputs = {
  email: string;
  password: string;
  fullName: string;
  contactNumber: string;
};
