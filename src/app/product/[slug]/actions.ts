"use server";

import { getPartRecommendations, PartRecommendationInput } from "@/ai/flows/part-recommendation";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";

type RecommendationResult = {
  reasoning?: string;
  products?: Product[];
  error?: string;
};

export async function fetchRecommendations(productId: string): Promise<RecommendationResult> {
  try {
    const recommendationInput: PartRecommendationInput = {
      currentProductId: productId,
      // Mocking user history for demonstration purposes
      userPurchaseHistory: "P-007,P-004",
    };
    
    const result = await getPartRecommendations(recommendationInput);

    if (!result || !result.recommendedParts) {
      return { error: 'Could not generate recommendations.' };
    }

    const recommendedProducts = result.recommendedParts
      .map(partId => products.find(p => p.id === partId))
      .filter((p): p is Product => Boolean(p) && p.id !== productId); // Filter out nulls and current product

    return {
      reasoning: result.reasoning,
      products: recommendedProducts,
    };
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    // In a real app, you might want to log this error to a monitoring service
    return { error: "Failed to fetch recommendations due to a server error." };
  }
}
