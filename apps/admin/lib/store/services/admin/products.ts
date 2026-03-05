import { api } from '../../api';
import type { Product } from '../products';

export interface CreateProductInput {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceMad: number;
  image: string;
  category: string;
  sku?: string;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens?: string[];
  tags?: string[];
}

export const adminProductsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<{ status: string; data: Product[] }, void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation<{ status: string; data: Product }, CreateProductInput>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<{ status: string; data: Product }, { id: string; data: Partial<CreateProductInput> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Products', id }],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminProductsApi;
