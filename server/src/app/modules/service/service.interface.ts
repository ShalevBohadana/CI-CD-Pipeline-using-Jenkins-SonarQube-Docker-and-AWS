/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

interface IOption {
  index?: number;
  title: string;
  price?: number;
}

export interface IServiceFilterOptions {
  region: string[];
  faction: string[];
  boostMethod: string[];
  executionOption: IOption[];
  additionalOption: IOption[];
}

export interface IService {
  categoryId: Types.ObjectId;
  title: string;
  sku?: string;
  url?: string;
  details: string;
  benefitPoint: string;
  additionalPoint: string;
  requirementPoint: string;
  howItWorks: string;
  sellingPrice: number;
  serviceFee: number;
  image: string;
  tag: string[];
  creator: Types.ObjectId;
  // Service filter options
  filters: object;
}

export interface IServiceModel extends Model<IService> {
  isExistingService: (sku: string) => Promise<IService>;
  isExistingServiceTitle: (title: string) => Promise<IService>;
}

export interface IServiceFilters {
  search?: string;
}
