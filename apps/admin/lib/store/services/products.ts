import { api } from '../api';

export interface Product {
  _id: string;
  id: string;
  handle: string;
  title: string;
  description: string;
  priceMad: number;
  image: string;
  category: string;
  availability: 'Active' | 'Inactive';
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens?: string[];
  tags?: string[];
}

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<{ status: string; data: Product[] }, void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getProductByHandle: builder.query<{ status: string; data: Product }, string>({
      query: (handle) => `/products/handle/${handle}`,
      providesTags: (_result, _error, handle) => [{ type: 'Products', id: handle }],
    }),
    getProductById: builder.query<{ status: string; data: Product }, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByHandleQuery,
  useGetProductByIdQuery,
} = productsApi;
