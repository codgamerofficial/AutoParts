'use server';

/**
 * @fileOverview Recommends compatible or related parts based on the currently viewed product.
 *
 * - getPartRecommendations - A function that handles the part recommendation process.
 * - PartRecommendationInput - The input type for the getPartRecommendations function.
 * - PartRecommendationOutput - The return type for the getPartRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PartRecommendationInputSchema = z.object({
  currentProductId: z.string().describe('The ID of the currently viewed product.'),
  userPurchaseHistory: z
    .string()
    .optional()
    .describe('A comma-separated list of product IDs representing the user\'s past purchases.'),
});
export type PartRecommendationInput = z.infer<typeof PartRecommendationInputSchema>;

const PartRecommendationOutputSchema = z.object({
  recommendedParts: z
    .array(z.string())
    .describe('A list of product IDs that are recommended to the user.'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the part recommendations, explaining why these parts are recommended.'),
});
export type PartRecommendationOutput = z.infer<typeof PartRecommendationOutputSchema>;

export async function getPartRecommendations(input: PartRecommendationInput): Promise<PartRecommendationOutput> {
  return partRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'partRecommendationPrompt',
  input: {schema: PartRecommendationInputSchema},
  output: {schema: PartRecommendationOutputSchema},
  prompt: `You are an expert auto parts advisor. A user is currently viewing the product with ID "{{{currentProductId}}}". Based on this product and the user's purchase history, recommend other parts that the user might need. Explain your reasoning for each recommendation.

Purchase History: {{#if userPurchaseHistory}}{{{userPurchaseHistory}}}{{else}}None{{/if}}

Respond with a list of recommended product IDs and your reasoning in the requested JSON format.`,
});

const partRecommendationFlow = ai.defineFlow(
  {
    name: 'partRecommendationFlow',
    inputSchema: PartRecommendationInputSchema,
    outputSchema: PartRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
