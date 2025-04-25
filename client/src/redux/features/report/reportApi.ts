import { HTTP_VERB } from '../../../enums';
import { api, ResSuccess } from '../../api/apiSlice';

export type ReportDB = {
  userId: string;
  reportType: string;
  reason?: string;
  fine?: {
    amount?: number;
    reason: string;
  };
};

const reportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation<ResSuccess<ReportDB>, Partial<ReportDB>>({
      query: (payload) => {
        return {
          url: `/report`,
          method: HTTP_VERB.POST,
          body: payload,
        };
      },
      invalidatesTags: ['report'],
    }),
  }),
});

export const { useCreateReportMutation } = reportApi;
