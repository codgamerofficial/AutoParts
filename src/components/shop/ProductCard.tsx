
import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";

import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <Link href={`/product/${product.slug}`} className="block">
        <CardHeader className="p-0 relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={`${product.category} auto part`}
          />
          {product.stock < 10 && (
            <Badge variant="destructive" className="absolute top-2 right-2">Low Stock</Badge>
          )}
          <Button variant="ghost" size="icon" className="absolute top-1 right-1 bg-white/50 backdrop-blur-sm rounded-full text-destructive hover:text-destructive hover:bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="h-5 w-5"/>
              <span className="sr-only">Add to Wishlist</span>
          </Button>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-headline font-semibold text-lg leading-tight truncate group-hover:text-primary">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.round(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
            </div>
            <span className="text-xs text-muted-foreground ml-2">({product.reviews.length} reviews)</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-xl font-bold font-headline text-primary">${product.price.toFixed(2)}</p>
          <Button size="sm" variant="secondary">
            View Details
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
