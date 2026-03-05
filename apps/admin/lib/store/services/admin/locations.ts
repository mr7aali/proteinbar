import { api } from '../../api';
import type { Location } from '../locations';

export interface CreateLocationInput {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  city: string;
  deliveryZones?: string[];
  timeSlots?: string[];
}

export const adminLocationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLocation: builder.mutation<{ status: string; data: Location }, CreateLocationInput>({
      query: (location) => ({
        url: '/locations',
        method: 'POST',
        body: location,
      }),
      invalidatesTags: ['Locations'],
    }),
    updateLocation: builder.mutation<{ status: string; data: Location }, { id: string; data: Partial<CreateLocationInput> }>({
      query: ({ id, data }) => ({
        url: `/locations/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Locations', id }],
    }),
    deleteLocation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/locations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Locations'],
    }),
  }),
});

export const {
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = adminLocationsApi;
