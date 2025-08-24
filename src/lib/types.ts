
import type { LucideIcon } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  specs: Record<string, string>;
  reviews: Review[];
  rating: number;
  stock: number;
};

export type CartItem = Product & { quantity: number };

export type Review = {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
};

    