import { api } from '../api';

export interface Order {
  _id: string;
  userId: string;
  items: Array<{
    productId: string;
    handle: string;
    title: string;
    quantity: number;
    priceMad: number;
  }>;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    emirate?: string;
    area?: string;
  };
  totals: {
    subtotal: number;
    giftDiscount: number;
    vat: number;
    safetyBag: number;
    grandTotal: number;
  };
  status: 'Pending' | 'Confirmed' | 'Prepared' | 'Delivered' | 'Cancelled';
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: 'COD' | 'Paid';
  confirmationStatus: 'Pending' | 'Confirmed' | 'Call back' | 'No answer';
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  items: Array<{
    productId: string;
    handle: string;
    title: string;
    quantity: number;
    priceMad: number;
  }>;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    emirate?: string;
    area?: string;
  };
  totals: {
    subtotal: number;
    giftDiscount: number;
    vat: number;
    safetyBag: number;
    grandTotal: number;
  };
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod?: 'COD' | 'Paid';
}

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<{ status: string; data: Order[] }, void>({
      query: () => '/orders/my-orders',
      providesTags: ['Orders'],
    }),
    getOrderById: builder.query<{ status: string; data: Order }, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Orders', id }],
    }),
    createOrder: builder.mutation<{ status: string; data: Order }, CreateOrderInput>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = ordersApi;
