import { api } from '../../api';
import type { MenuItem, MenuCategory } from '../menu';

export interface CreateMenuItemInput {
  id: string;
  name: string;
  description: string;
  priceMad: number;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  category: string;
  image?: string;
  allergens?: string[];
  tags?: string[];
}

export interface CreateCategoryInput {
  id: string;
  name: string;
  description: string;
  displayOrder?: number;
}

export const adminMenuApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createMenuItem: builder.mutation<{ status: string; data: MenuItem }, CreateMenuItemInput>({
      query: (item) => ({
        url: '/menu/items',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Menu'],
    }),
    updateMenuItem: builder.mutation<{ status: string; data: MenuItem }, { id: string; data: Partial<CreateMenuItemInput> }>({
      query: ({ id, data }) => ({
        url: `/menu/items/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Menu'],
    }),
    deleteMenuItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/menu/items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Menu'],
    }),
    createCategory: builder.mutation<{ status: string; data: MenuCategory }, CreateCategoryInput>({
      query: (category) => ({
        url: '/menu/categories',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Menu'],
    }),
    updateCategory: builder.mutation<{ status: string; data: MenuCategory }, { id: string; data: Partial<CreateCategoryInput> }>({
      query: ({ id, data }) => ({
        url: `/menu/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Menu'],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/menu/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Menu'],
    }),
  }),
});

export const {
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = adminMenuApi;
