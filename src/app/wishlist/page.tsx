
"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface WishlistPageProps {
  wishlist?: Product[];
  onRemoveFromWishlist?: (productId: string) => void;
}

export default function WishlistPage({ wishlist = [], onRemoveFromWishlist }: WishlistPageProps) {
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    // Here you would typically also call a function to update the cart state
  };

  const handleRemoveClick = (productId: string, productName: string) => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(productId);
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
        variant: "destructive",
      });
    }
  };

  if (!wishlist) {
    return (
        <div className="container py-12 text-center">
            <p>Loading wishlist...</p>
        </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold font-headline">Your Wishlist</h1>
        <Heart className="h-8 w-8 text-destructive fill-destructive" />
      </div>
      {wishlist.length === 0 ? (
        <div className="text-center py-16 border rounded-lg">
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="text-muted-foreground mt-2">Add items you love to your wishlist to save them for later.</p>
          <Button asChild className="mt-4">
            <Link href="/shop">Explore Parts</Link>
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="flex flex-col overflow-hidden">
                <Link href={`/product/${item.slug}`} className="block">
                    <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                    />
                </Link>
              <CardContent className="p-4 flex-grow">
                 <Link href={`/product/${item.slug}`} className="hover:text-primary">
                    <h3 className="font-headline font-semibold text-lg leading-tight truncate">{item.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{item.brand}</p>
                <p className="text-xl font-bold font-headline text-primary mt-2">${item.price.toFixed(2)}</p>
              </CardContent>
              <CardHeader className="p-4 pt-0">
                <div className="flex justify-between items-center gap-2">
                    <Button size="sm" className="w-full" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveClick(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
