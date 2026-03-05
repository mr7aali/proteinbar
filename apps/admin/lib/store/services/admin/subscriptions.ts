import { api } from '../../api';
import type { Subscription } from '../subscriptions';

export const adminSubscriptionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query<{ status: string; data: Subscription[] }, void>({
      query: () => '/subscriptions',
      providesTags: ['Subscriptions'],
    }),
    updateSubscriptionStatus: builder.mutation<
      { status: string; data: Subscription },
      { id: string; status: 'active' | 'paused' | 'cancelled' }
    >({
      query: ({ id, status }) => ({
        url: `/subscriptions/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Subscriptions', id }],
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useUpdateSubscriptionStatusMutation,
} = adminSubscriptionsApi;
