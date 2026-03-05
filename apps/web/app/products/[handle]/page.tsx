'use client';

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import ProductActions from "@/components/products/ProductActions";
import { useGetProductByHandleQuery } from "@/lib/store/services/products";

export default function ProductPage() {
  const params = useParams();
  const handle = params?.handle as string;
  
  const { data, isLoading, error } = useGetProductByHandleQuery(handle);

  if (isLoading) {
    return (
      <section className="pb-10 pt-24 sm:pb-14 sm:pt-28">
        <div className="text-center text-zinc-600">Loading product...</div>
      </section>
    );
  }

  if (error || !data?.data) {
    notFound();
  }

  const product = data.data;

  return (
    <section className="pb-10 pt-24 sm:pb-14 sm:pt-28">
      <Link href="/collections/all" className="text-sm text-zinc-600 hover:text-zinc-900">
        {"<"} Back to products
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-start">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <Image src={product.image || '/food/food.png'} alt={product.title} fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-3 text-lg text-zinc-600">{product.description}</p>
          <p className="mt-5 text-2xl font-semibold text-zinc-900">
            Dh {product.priceMad.toFixed(2)} MAD
          </p>
          <ProductActions product={product} />
        </div>
      </div>
    </section>
  );
}
