import { api } from '../../api';
import type { MonthlyPlan } from '../monthlyPlans';

export interface CreateMonthlyPlanInput {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  pricing: {
    basePrice: number;
    mealPrice: number;
    snackPrice: number;
  };
  features?: string[];
}

export const adminMonthlyPlansApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createMonthlyPlan: builder.mutation<{ status: string; data: MonthlyPlan }, CreateMonthlyPlanInput>({
      query: (plan) => ({
        url: '/monthly-plans',
        method: 'POST',
        body: plan,
      }),
      invalidatesTags: ['MonthlyPlans'],
    }),
    updateMonthlyPlan: builder.mutation<{ status: string; data: MonthlyPlan }, { id: string; data: Partial<CreateMonthlyPlanInput> }>({
      query: ({ id, data }) => ({
        url: `/monthly-plans/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'MonthlyPlans', id }],
    }),
    deleteMonthlyPlan: builder.mutation<void, string>({
      query: (id) => ({
        url: `/monthly-plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MonthlyPlans'],
    }),
  }),
});

export const {
  useCreateMonthlyPlanMutation,
  useUpdateMonthlyPlanMutation,
  useDeleteMonthlyPlanMutation,
} = adminMonthlyPlansApi;
