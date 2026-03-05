import { api } from '../../api';
import type { Order } from '../orders';

export const adminOrdersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<{ status: string; data: Order[] }, void>({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
    updateOrderStatus: builder.mutation<
      { status: string; data: Order },
      { id: string; status: 'Pending' | 'Confirmed' | 'Prepared' | 'Delivered' | 'Cancelled' }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Orders', id }],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = adminOrdersApi;
