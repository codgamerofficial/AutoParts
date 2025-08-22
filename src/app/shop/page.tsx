
"use client";

import { useState, useMemo } from "react";
import { products, categories } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface ShopPageProps {
  onAddToWishlist?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export default function ShopPage({ onAddToWishlist, onAddToCart }: ShopPageProps) {
  const [sortOption, setSortOption] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  const brands = [...new Set(products.map((p) => p.brand))];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleBrandChange = (brandName: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) 
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      const categoryNames = categories
        .filter(c => selectedCategories.includes(c.id))
        .map(c => c.name);
      filtered = filtered.filter(p => categoryNames.includes(p.category));
    }
    
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    switch (sortOption) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'popular':
        return filtered.sort((a, b) => b.reviews.length - a.reviews.length);
      case 'featured':
      default:
        // Basic featured logic (can be replaced with a real one)
        return filtered.sort((a, b) => b.rating - a.rating);
    }
  }, [sortOption, selectedCategories, selectedBrands]);

  const filtersContent = (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold font-headline mb-4">Filters</h3>
        
        {/* Sort By */}
        <div className="mb-6">
          <Label htmlFor="sort-by" className="text-base font-medium">Sort By</Label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger id="sort-by" className="mt-2">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4"/>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-base font-medium mb-2">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`cat-${category.id}`} 
                  onCheckedChange={() => handleCategoryChange(category.id)}
                  checked={selectedCategories.includes(category.id)}
                />
                <Label htmlFor={`cat-${category.id}`} className="font-normal cursor-pointer">{category.name}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4"/>

        {/* Brands */}
        <div>
          <h4 className="text-base font-medium mb-2">Brand</h4>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox 
                  id={`brand-${brand}`} 
                  onCheckedChange={() => handleBrandChange(brand)}
                  checked={selectedBrands.includes(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="font-normal cursor-pointer">{brand}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container py-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight">
            Shop All Parts
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find everything you need to keep your vehicle running at its best.
          </p>
        </div>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Filter className="h-5 w-5" />
                        <span className="sr-only">Filters</span>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    {filtersContent}
                </SheetContent>
            </Sheet>
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="hidden md:block md:col-span-1">
            {filtersContent}
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToWishlist={onAddToWishlist} onAddToCart={onAddToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg">
              <h2 className="text-2xl font-semibold">No products found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
            </div>
          )}
          {/* TODO: Add pagination */}
        </main>
      </div>
    </div>
  );
}
