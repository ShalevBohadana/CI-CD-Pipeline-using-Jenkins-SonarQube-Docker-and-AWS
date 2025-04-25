import { IAdmin } from './admin.interface';
import Admin from './admin.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAdmins = async (): Promise<IAdmin[]> => {
  const admins = await Admin.find({});
  return admins;
};

const getAdmin = async (id: string): Promise<IAdmin | null> => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  return admin;
};

const createAdmin = async (adminData: IAdmin): Promise<IAdmin> => {
  const admin = await Admin.create(adminData);
  return admin;
};

const updateAdmin = async (
  id: string,
  adminData: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const admin = await Admin.findByIdAndUpdate(id, adminData, { new: true });
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  return admin;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const admin = await Admin.findByIdAndDelete(id);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  return admin;
};

export const AdminService = {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
