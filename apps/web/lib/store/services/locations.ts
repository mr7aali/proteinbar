import { api } from '../api';

export interface Location {
  _id: string;
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  city: string;
  deliveryZones?: string[];
  timeSlots?: string[];
  isActive: boolean;
}

export const locationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<{ status: string; data: Location[] }, void>({
      query: () => '/locations',
      providesTags: ['Locations'],
    }),
    getLocationById: builder.query<{ status: string; data: Location }, string>({
      query: (id) => `/locations/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Locations', id }],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useGetLocationByIdQuery,
} = locationsApi;
