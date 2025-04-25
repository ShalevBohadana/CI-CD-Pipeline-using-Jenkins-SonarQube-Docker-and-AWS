import { HTTP_VERB } from '../../../enums';
import { NormalizedDbData } from '../../../types/globalTypes';
import { api, ResSuccess } from '../../api/apiSlice';

type IEmployeeData = NormalizedDbData & {
  SellerId: string;
  email: string;
  roles: string;
  contactNumber: string;
  name: {
    firstName: string;
    lastName: string;
  };
  dateHired: string;
  department: string;
};

export const SellerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSellers: builder.query<ResSuccess<IEmployeeData[]>, string>({
      query: (searchParams) => {
        return {
          url: `/seller?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['user', 'employee'],
    }),
    searchSellers: builder.query<ResSuccess<IEmployeeData[]>, string>({
      query: (searchParams) => {
        return {
          url: `/seller?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['employee'],
    }),
    getSeller: builder.query<ResSuccess<IEmployeeData>, string>({
      query: (dbId) => {
        return {
          url: `/seller/${dbId}`,
          method: HTTP_VERB.GET,
        };
      },
      providesTags: ['employee'],
    }),
  }),
});

export const { useGetSellersQuery, useGetSellerQuery, useSearchSellersQuery } = SellerApi;
