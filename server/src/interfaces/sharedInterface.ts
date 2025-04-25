export interface IPaginationOption {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  category?: string;
  search?: string;
}

export interface IGenericDataWithMeta<T> {
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    category?: string;
    search?: string;
  };
  data: T;
  message?: string;
}

export interface IGenericResponse<T> {
  statusCode?: number;
  success?: boolean;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data?: T;
  message: string;
}

export interface IAddress {
  addressLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
