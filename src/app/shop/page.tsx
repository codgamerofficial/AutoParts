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

export default function ShopPage() {
  // TODO: Implement actual filtering and sorting logic
  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">
          Shop All Parts
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find everything you need to keep your vehicle running at its best.
        </p>
      </header>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold font-headline mb-4">Filters</h3>
              
              {/* Sort By */}
              <div className="mb-6">
                <Label htmlFor="sort-by" className="text-base font-medium">Sort By</Label>
                <Select>
                  <SelectTrigger id="sort-by" className="mt-2">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
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
                      <Checkbox id={`cat-${category.id}`} />
                      <Label htmlFor={`cat-${category.id}`} className="font-normal">{category.name}</Label>
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
                      <Checkbox id={`brand-${brand}`} />
                      <Label htmlFor={`brand-${brand}`} className="font-normal">{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* TODO: Add pagination */}
        </main>
      </div>
    </div>
  );
}
