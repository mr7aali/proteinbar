import { api } from '../api';

export interface Subscription {
  _id: string;
  userId: string;
  planId: string;
  planTitle: string;
  selection: {
    meals: string;
    days: string;
    snacks: string;
    startDate: string;
    planType?: string;
  };
  delivery: {
    optionId: 'daily-delivery' | 'daily-pickup' | 'weekly-delivery' | 'weekly-pickup';
    address?: string;
    pickupLocation?: {
      id: string;
      name: string;
      address: string;
    };
  };
  status: 'active' | 'paused' | 'cancelled';
  pricing: {
    subtotal: number;
    discount: number;
    total: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionInput {
  planId: string;
  planTitle: string;
  selection: {
    meals: string;
    days: string;
    snacks: string;
    startDate: string;
    planType?: string;
  };
  delivery: {
    optionId: 'daily-delivery' | 'daily-pickup' | 'weekly-delivery' | 'weekly-pickup';
    address?: string;
    pickupLocation?: {
      id: string;
      name: string;
      address: string;
    };
  };
  pricing: {
    subtotal: number;
    discount: number;
    total: number;
  };
}

export const subscriptionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMySubscriptions: builder.query<{ status: string; data: Subscription[] }, void>({
      query: () => '/subscriptions/my-subscriptions',
      providesTags: ['Subscriptions'],
    }),
    getSubscriptionById: builder.query<{ status: string; data: Subscription }, string>({
      query: (id) => `/subscriptions/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Subscriptions', id }],
    }),
    createSubscription: builder.mutation<{ status: string; data: Subscription }, CreateSubscriptionInput>({
      query: (subscription) => ({
        url: '/subscriptions',
        method: 'POST',
        body: subscription,
      }),
      invalidatesTags: ['Subscriptions'],
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
  useGetMySubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionStatusMutation,
} = subscriptionsApi;
