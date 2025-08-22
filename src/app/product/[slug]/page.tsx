
"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, CheckCircle, ShieldCheck, Heart } from "lucide-react";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import AiRecommendations from "@/components/product/AiRecommendations";
import React from "react";
import type { Product } from "@/lib/types";

type ProductPageProps = {
  params: {
    slug: string;
  };
  onAddToWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export default function ProductPage({ params: paramsPromise, onAddToWishlist, onAddToCart }: ProductPageProps) {
  const params = React.use(paramsPromise);
  const slug = params.slug;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const onWishlistClick = () => {
    if (onAddToWishlist) {
        onAddToWishlist(product);
    }
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative">
                    <Image
                      src={src}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                      data-ai-hint={`${product.category} auto part`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline">
            {product.name}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">{product.brand}</p>
          <div className="flex items-center mt-4">
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.round(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <p className="text-4xl font-bold font-headline text-primary mt-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex gap-2">
            <Button
              size="lg"
              className="w-full"
              variant="default"
              onClick={handleAddToCartClick}
            >
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="px-4" onClick={onWishlistClick}>
              <Heart className="h-6 w-6" />
              <span className="sr-only">Add to Wishlist</span>
            </Button>
          </div>

          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
              <span>1-Year Manufacturer Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion for more details */}
      <div className="mt-16">
        <Accordion type="single" collapsible defaultValue="specs">
          <AccordionItem value="specs">
            <AccordionTrigger className="text-xl font-semibold font-headline">
              Specifications
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="flex justify-between">
                    <span className="font-medium text-muted-foreground">
                      {key}
                    </span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reviews">
            <AccordionTrigger className="text-xl font-semibold font-headline">
              Customer Reviews ({product.reviews.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6">
                {product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-center mb-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        <p className="ml-2 font-semibold">{review.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        By {review.author} on {review.date}
                      </p>
                      <p>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Separator className="my-16" />

      {/* AI Recommendations */}
      <AiRecommendations productId={product.id} productName={product.name} onAddToWishlist={onAddToWishlist} onAddToCart={onAddToCart} />
    </div>
  );
}
