'use client';

import { useGetMenuCategoriesQuery } from '@/lib/store/services/menu';
import { useGetProductsQuery } from '@/lib/store/services/products';
import { useGetLocationsQuery } from '@/lib/store/services/locations';
import { useGetMonthlyPlansQuery } from '@/lib/store/services/monthlyPlans';

export default function APITestPage() {
  const menu = useGetMenuCategoriesQuery();
  const products = useGetProductsQuery();
  const locations = useGetLocationsQuery();
  const plans = useGetMonthlyPlansQuery();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">API Integration Test</h1>

      {/* Menu Test */}
      <section className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Menu Categories</h2>
        {menu.isLoading && <p>Loading menu...</p>}
        {menu.error && <p className="text-red-600">Error: {JSON.stringify(menu.error)}</p>}
        {menu.data && (
          <div>
            <p className="text-green-600">✅ Success! Found {menu.data.data.length} categories</p>
            <pre className="bg-gray-100 p-2 mt-2 text-xs overflow-auto">
              {JSON.stringify(menu.data.data[0], null, 2)}
            </pre>
          </div>
        )}
      </section>

      {/* Products Test */}
      <section className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        {products.isLoading && <p>Loading products...</p>}
        {products.error && <p className="text-red-600">Error: {JSON.stringify(products.error)}</p>}
        {products.data && (
          <div>
            <p className="text-green-600">✅ Success! Found {products.data.data.length} products</p>
            <pre className="bg-gray-100 p-2 mt-2 text-xs overflow-auto">
              {JSON.stringify(products.data.data[0], null, 2)}
            </pre>
          </div>
        )}
      </section>

      {/* Locations Test */}
      <section className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Locations</h2>
        {locations.isLoading && <p>Loading locations...</p>}
        {locations.error && <p className="text-red-600">Error: {JSON.stringify(locations.error)}</p>}
        {locations.data && (
          <div>
            <p className="text-green-600">✅ Success! Found {locations.data.data.length} locations</p>
            <pre className="bg-gray-100 p-2 mt-2 text-xs overflow-auto">
              {JSON.stringify(locations.data.data[0], null, 2)}
            </pre>
          </div>
        )}
      </section>

      {/* Monthly Plans Test */}
      <section className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Monthly Plans</h2>
        {plans.isLoading && <p>Loading plans...</p>}
        {plans.error && <p className="text-red-600">Error: {JSON.stringify(plans.error)}</p>}
        {plans.data && (
          <div>
            <p className="text-green-600">✅ Success! Found {plans.data.data.length} plans</p>
            <pre className="bg-gray-100 p-2 mt-2 text-xs overflow-auto">
              {JSON.stringify(plans.data.data[0], null, 2)}
            </pre>
          </div>
        )}
      </section>

      <div className="border-t pt-4">
        <h3 className="font-semibold">API Base URL:</h3>
        <p className="text-sm text-gray-600">{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}</p>
      </div>
    </div>
  );
}
