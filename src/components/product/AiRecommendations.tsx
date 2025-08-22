
"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

import type { Product } from "@/lib/types";
import { fetchRecommendations } from "@/app/product/[slug]/actions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProductCard } from "@/components/shop/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface AiRecommendationsProps {
  productId: string;
  productName: string;
  onAddToWishlist?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

type RecommendationState = {
  reasoning: string;
  products: Product[];
} | null;

export default function AiRecommendations({ productId, productName, onAddToWishlist, onAddToCart }: AiRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationState>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendations(null);

    const result = await fetchRecommendations(productId);

    if (result.error) {
      setError(result.error);
    } else if (result.products && result.reasoning) {
      setRecommendations({ products: result.products, reasoning: result.reasoning });
    }
    setLoading(false);
  };

  return (
    <section id="ai-recommendations">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline">AI-Powered Recommendations</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Not sure what else you need? Let our AI assistant suggest compatible parts for your{" "}
          <span className="font-semibold text-primary">{productName}</span>.
        </p>
        <Button size="lg" onClick={handleGetRecommendations} disabled={loading} className="mt-6">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Recommendations
            </>
          )}
        </Button>
      </div>

      <div className="mt-8">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-1/2" />
              </div>
            ))}
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {recommendations && (
          <div className="space-y-8">
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle className="font-headline">AI Recommendation</AlertTitle>
              <AlertDescription>{recommendations.reasoning}</AlertDescription>
            </Alert>
            
            {recommendations.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.products.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToWishlist={onAddToWishlist} onAddToCart={onAddToCart} />
                ))}
              </div>
            ) : (
                <p className="text-center text-muted-foreground">The AI couldn't find any specific recommendations for this part right now.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
