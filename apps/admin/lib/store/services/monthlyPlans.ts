import { api } from '../api';

export interface MonthlyPlan {
  _id: string;
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
  features: string[];
  isActive: boolean;
}

export const monthlyPlansApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMonthlyPlans: builder.query<{ status: string; data: MonthlyPlan[] }, void>({
      query: () => '/monthly-plans',
      providesTags: ['MonthlyPlans'],
    }),
    getMonthlyPlanById: builder.query<{ status: string; data: MonthlyPlan }, string>({
      query: (id) => `/monthly-plans/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'MonthlyPlans', id }],
    }),
  }),
});

export const {
  useGetMonthlyPlansQuery,
  useGetMonthlyPlanByIdQuery,
} = monthlyPlansApi;
