
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Users, Star, Truck, Undo, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types";
import { BrandSlider } from "@/components/layout/BrandSlider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface HomePageProps {
  onAddToWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export default function Home({ onAddToWishlist, onAddToCart }: HomePageProps) {
  const featuredProducts = products.slice(0, 4);
  const years = Array.from({ length: 26 }, (_, i) => 2025 - i); // 2025 down to 2000
  const brands = [...new Set(products.map((p) => p.brand))].sort();

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24 pb-16">
      {/* Hero Section */}
       <section className="relative py-20 lg:py-28 text-white overflow-hidden">
        <div className="absolute inset-0">
            <Image
                src="https://i.ibb.co/1f7ff5tH/homethumb.jpg"
                alt="Car engine bay"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container relative px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-extrabold font-headline">
                Find the Right Parts for Your Vehicle
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-white/90">
                Premium OEM and aftermarket auto parts with fast shipping, expert support, and guaranteed fitment.
              </p>
            </div>

          <Card className="max-w-4xl mx-auto mt-10 p-6 text-left shadow-2xl bg-card/80 backdrop-blur-sm border-white/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-0">
               <p className="font-headline font-semibold text-lg mb-4 text-card-foreground">Find Parts for Your Vehicle</p>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select Year" /></SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select Make" /></SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand.toLowerCase().replace(/[^a-z0-9]/g, '')}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select Model" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="f150">F-150</SelectItem>
                        <SelectItem value="camry">Camry</SelectItem>
                        <SelectItem value="civic">Civic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button size="lg" className="w-full h-auto text-base">Find Parts</Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container -mt-20 lg:-mt-24 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-background rounded-lg shadow-lg p-4 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-primary"/>
                <span className="font-semibold">Guaranteed Fitment</span>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-4 flex items-center gap-3">
                <Users className="h-6 w-6 text-primary"/>
                <span className="font-semibold">Expert Support</span>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-4 flex items-center gap-3">
                <Star className="h-6 w-6 text-primary fill-primary"/>
                <span className="font-semibold">4.8/5 Rating</span>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-4 flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary"/>
                <span className="font-semibold">Free Shipping over $99</span>
            </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-headline">Browse By Category</h2>
          <p className="text-muted-foreground mt-2">
            Find exactly what you need from our wide range of categories.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link href={`/shop?category=${category.slug}`} key={category.id}>
              <div className="group text-center p-4 rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                <category.icon className="h-10 w-10 mx-auto text-accent transition-colors duration-300" />
                <h3 className="mt-4 font-semibold font-headline text-base">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold font-headline">Featured Products</h2>
            <p className="text-muted-foreground mt-2">
              Top picks and best sellers from our collection.
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/shop">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToWishlist={onAddToWishlist} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
      
      {/* Brand Slider Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline">Trusted Premium Brands</h2>
            <p className="text-muted-foreground mt-2">
              We partner with the best to bring you unbeatable quality.
            </p>
          </div>
          <BrandSlider />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 flex flex-col items-center">
              <Undo className="h-10 w-10 text-primary mb-3"/>
              <h3 className="text-xl font-bold font-headline">30-Day Returns</h3>
              <p className="mt-2 text-muted-foreground text-sm">Easy returns & exchanges</p>
          </div>
          <div className="p-6 flex flex-col items-center">
              <Lock className="h-10 w-10 text-primary mb-3"/>
              <h3 className="text-xl font-bold font-headline">Secure Checkout</h3>
              <p className="mt-2 text-muted-foreground text-sm">SSL encrypted payments</p>
          </div>
          <div className="p-6 flex flex-col items-center">
               <Truck className="h-10 w-10 text-primary mb-3"/>
              <h3 className="text-xl font-bold font-headline">Fast Shipping</h3>
              <p className="mt-2 text-muted-foreground text-sm">On orders over $99</p>
          </div>
           <div className="p-6 flex flex-col items-center">
               <Phone className="h-10 w-10 text-primary mb-3"/>
              <h3 className="text-xl font-bold font-headline">Expert Support</h3>
              <p className="mt-2 text-muted-foreground text-sm">Call 1-800-AUTOPARTS</p>
          </div>
      </section>
    </div>
  );
}
