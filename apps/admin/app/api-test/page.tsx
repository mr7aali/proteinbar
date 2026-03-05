'use client';

import { useGetAllOrdersQuery } from '@/lib/store/services/admin/orders';
import { useGetAllProductsQuery } from '@/lib/store/services/admin/products';
import { useGetMenuCategoriesQuery } from '@/lib/store/services/menu';

export default function AdminAPITestPage() {
  const orders = useGetAllOrdersQuery();
  const products = useGetAllProductsQuery();
  const menu = useGetMenuCategoriesQuery();

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Admin API Integration Test</h1>

      {/* Orders Test */}
      <section className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">All Orders (Admin)</h2>
        {orders.isLoading && <p>Loading orders...</p>}
        {orders.error && <p className="text-red-600">Error: {JSON.stringify(orders.error)}</p>}
        {orders.data && (
          <div>
            <p className="text-green-600">✅ Success! Found {orders.data.data.length} orders</p>
            {orders.data.data.length > 0 && (
              <pre className="bg-gray-100 p-2 mt-2 text-xs overflow-auto">
                {JSON.stringify(orders.data.data[0], null, 2)}
              </pre>
            )}
          </div>
        )}
      </section>

      {/* Products Test */}
      <section className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">All Products (Admin)</h2>
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

      <div className="border-t pt-4">
        <h3 className="font-semibold">API Base URL:</h3>
        <p className="text-sm text-gray-600">{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}</p>
        <p className="text-sm text-yellow-600 mt-2">
          Note: Admin endpoints require authentication. Login first to see data.
        </p>
      </div>
    </div>
  );
}
