import { HTTP_VERB } from '../../../enums';
import { NormalizedDbData } from '../../../types/globalTypes';
import { api, ResSuccess } from '../../api/apiSlice';

type IUser = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  phone: string;

  status: 'active' | 'inactive';
  avatar: string;
  online?: boolean;
};
export type IEmployeeData = NormalizedDbData & {
  EmployeeId: string;
  email: string;
  roles: string;
  contactNumber: string;
  name: {
    firstName: string;
    lastName: string;
  };
  dateHired: string;
  department: string;
  userId: IUser;
};

export const EmployeeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<ResSuccess<IEmployeeData[]>, string>({
      query: (searchParams) => {
        return {
          url: `/employee?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['user', 'employee'],
    }),
    createEmployee: builder.mutation<
      ResSuccess<IEmployeeData>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Partial<IEmployeeData | any>
    >({
      query: (payload) => {
        return {
          url: `/employee`,
          method: HTTP_VERB.POST,
          body: payload,
        };
      },
      invalidatesTags: ['user', 'employee'],
    }),
    searchEmployees: builder.query<ResSuccess<IEmployeeData[]>, string>({
      query: (searchParams) => {
        return {
          url: `/employee?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['employee'],
    }),
    getEmployee: builder.query<ResSuccess<IEmployeeData>, string>({
      query: (dbId) => {
        return {
          url: `/employee/${dbId}`,
          method: HTTP_VERB.GET,
        };
      },
      providesTags: ['employee'],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useSearchEmployeesQuery,
  useCreateEmployeeMutation,
} = EmployeeApi;
