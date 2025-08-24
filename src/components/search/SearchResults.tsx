
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SearchResultsProps {
  results: Product[];
  onResultClick: () => void;
}

export function SearchResults({ results, onResultClick }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-auto max-h-96">
      <div className="flex flex-col">
        {results.map((product, index) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="block hover:bg-accent"
            onClick={onResultClick}
          >
            <div className="flex items-center p-3">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={50}
                height={50}
                className="rounded-md object-cover mr-4"
              />
              <div className="flex-grow">
                <p className="font-semibold text-sm leading-tight">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
              </div>
              <p className="text-sm font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>
            {index < results.length - 1 && <Separator />}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
