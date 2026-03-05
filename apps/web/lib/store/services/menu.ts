import { api } from '../api';

export interface MenuItem {
  _id: string;
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
  availability: 'Active' | 'Inactive';
}

export interface MenuCategory {
  _id: string;
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
  displayOrder: number;
  isVisible: boolean;
}

export const menuApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMenuCategories: builder.query<{ status: string; data: MenuCategory[] }, void>({
      query: () => '/menu/categories',
      providesTags: ['Menu'],
    }),
    getMenuItems: builder.query<{ status: string; data: MenuItem[] }, void>({
      query: () => '/menu/items',
      providesTags: ['Menu'],
    }),
    getMenuItemById: builder.query<{ status: string; data: MenuItem }, string>({
      query: (id) => `/menu/items/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Menu', id }],
    }),
  }),
});

export const {
  useGetMenuCategoriesQuery,
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
} = menuApi;
