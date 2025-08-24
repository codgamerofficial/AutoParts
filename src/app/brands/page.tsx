
import { products } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandsPage() {
  const brands = [...new Set(products.map((p) => p.brand))].sort();

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold font-headline">Shop by Brand</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We carry a wide selection of parts from the most trusted names in the industry.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Card key={brand} className="text-center hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{brand}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href={`/shop?brand=${encodeURIComponent(brand)}`}>
                  View Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
