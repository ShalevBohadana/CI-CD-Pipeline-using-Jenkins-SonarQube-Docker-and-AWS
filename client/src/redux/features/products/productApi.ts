import { api } from '../../api/apiSlice';

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getSingleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    getComments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comment'],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetSingleProductQuery,
  useGetProductsQuery,
  usePostCommentMutation,
} = productsApi;
