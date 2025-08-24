
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types";
import { BrandSlider } from "@/components/layout/BrandSlider";

interface HomePageProps {
  onAddToWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export default function Home({ onAddToWishlist, onAddToCart }: HomePageProps) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://i.ibb.co/d0H3jkCg/homethumb.jpg"
          alt="Modern sports car"
          fill
          objectFit="cover"
          className="z-0 brightness-50"
          data-ai-hint="modern car"
          priority
        />
        <div className="relative z-10 p-4 container">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline animate-fade-in-up">
            Find the Right Part, Right Now
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            High-quality auto parts from brands you trust. Fast shipping, great prices.
          </p>
          <div className="mt-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <Input
                placeholder="Search by part name, number, or vehicle..."
                className="h-12 text-base sm:text-lg pl-5 pr-28 sm:pr-32 text-foreground"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2" size="sm" variant="accent">
                <Search className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Search</span>
              </Button>
            </div>
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
      <section className="bg-card py-16">
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
      <section className="bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline">Why Choose AutoParts.com?</h2>
            <p className="text-muted-foreground mt-2">
              We are committed to providing you with the best experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                  <h3 className="text-xl font-bold font-headline text-primary">Quality Guarantee</h3>
                  <p className="mt-2 text-muted-foreground">Every part we sell is tested for quality and durability, so you can shop with confidence.</p>
              </div>
              <div className="p-6">
                  <h3 className="text-xl font-bold font-headline text-primary">Expert Support</h3>
                  <p className="mt-2 text-muted-foreground">Our team of experienced auto experts is here to help you find the right part for your vehicle.</p>
              </div>
              <div className="p-6">
                  <h3 className="text-xl font-bold font-headline text-primary">Fast Shipping</h3>
                  <p className="mt-2 text-muted-foreground">We offer fast, reliable shipping to get you back on the road as quickly as possible.</p>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
