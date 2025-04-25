import { HTTP_VERB } from '../../../enums';
import { api, ResSuccess } from '../../api/apiSlice';

export interface Selected {
  price: number;
  region?: string;
  filters?: Array<{ name: string; value: string[] }>;
  [key: string]: any;
}

export interface CartItem {
  itemId: number;
  itemType: string;
  seller: string;
  offerId: string;
  offerName: string;
  offerImage: string;
  selected: Selected;
}

export interface CartPromo {
  code: string;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  sessionId?: string;
  promo?: CartPromo;
  userId?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `/cart`,
        method: HTTP_VERB.GET,
      }),
      providesTags: ['cart'],
      transformResponse: (response: ResSuccess<Cart>) => response,
    }),

    addToCart: builder.mutation({
      query: (payload: CartItem) => ({
        url: `/cart`,
        method: HTTP_VERB.POST,
        body: payload,
      }),
      invalidatesTags: ['cart'],
      transformResponse: (response: ResSuccess<Cart>) => response,
    }),

    removeFromCart: builder.mutation({
      query: (payload: Pick<CartItem, 'itemId'>) => ({
        url: `/cart`,
        method: HTTP_VERB.PATCH,
        body: payload,
      }),
      invalidatesTags: ['cart'],
      transformResponse: (response: ResSuccess<Cart>) => response,
    }),

    applyPromo: builder.mutation({
      query: (payload: CartPromo) => ({
        url: `/cart/apply-promo`,
        method: HTTP_VERB.PATCH,
        body: payload,
      }),
      invalidatesTags: ['cart'],
      transformResponse: (response: ResSuccess<Cart>) => response,
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useApplyPromoMutation,
} = cartApi;