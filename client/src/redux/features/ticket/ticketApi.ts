import { HTTP_VERB } from '../../../enums';
import { TicketDataDb } from '../../../pages/Dashboard/Admin/components/TicketSummaryItem';
import { SupportTicketFormInputs } from '../../../pages/Support/components/SupportForm';
import { api, ResSuccess } from '../../api/apiSlice';

const ticketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<ResSuccess<TicketDataDb[]>, string>({
      query: (searchParams) => ({
        url: `/ticket?${searchParams}`,
        method: 'GET',
      }),
      providesTags: ['ticket'],
    }),

    getTicket: builder.query<ResSuccess<TicketDataDb>, string>({
      query: (uid) => ({
        url: `/ticket/${uid}`,
        method: 'GET',
      }),
      providesTags: ['ticket'],
    }),

    createTicket: builder.mutation<ResSuccess<TicketDataDb>, SupportTicketFormInputs>({
      query: (payload) => {
        return {
          url: `/ticket`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['ticket'],
    }),
    createDiscordChannel: builder.mutation<ResSuccess<TicketDataDb>, Partial<TicketDataDb>>({
      query: (payload) => {
        return {
          url: `/ticket/discord-channel/${payload._id}`,
          method: HTTP_VERB.PATCH,
          body: payload,
        };
      },
      invalidatesTags: ['ticket'],
    }),

    updateTicket: builder.mutation<ResSuccess<TicketDataDb>, Partial<TicketDataDb>>({
      query: (payload) => {
        return {
          url: `/ticket/${payload._id}`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: ['ticket'],
    }),

    deleteTicket: builder.mutation<ResSuccess<object>, string>({
      query: (uid) => ({
        url: `/ticket/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ticket'],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useLazyGetTicketsQuery,
  useGetTicketQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useCreateDiscordChannelMutation,
} = ticketApi;
