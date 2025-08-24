
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Truck, Percent } from "lucide-react";
import Link from "next/link";

const deals = [
  {
    icon: Percent,
    title: "15% Off All Brake Parts",
    description: "Upgrade your stopping power for less. Get 15% off all brake pads, rotors, and kits. Discount automatically applied at checkout.",
    cta: "Shop Brakes",
    link: "/shop?category=brakes",
  },
  {
    icon: Truck,
    title: "Free Shipping on Orders Over $75",
    description: "Load up your cart with everything you need. All orders totaling $75 or more ship for free, no code required.",
    cta: "Start Shopping",
    link: "/shop",
  },
  {
    icon: Tag,
    title: "Oil Change Bundle",
    description: "Get a 5-quart jug of Mobil 1 Full Synthetic oil and a Bosch Premium Oil Filter for just $50. The perfect bundle for your next DIY oil change.",
    cta: "View Bundle",
    link: "/product/mobil-1-synthetic-engine-oil",
  },
];

export default function DealsPage() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold font-headline">Deals & Promotions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Save big on quality parts with our latest offers and special discounts.
        </p>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {deals.map((deal, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
               <div className="p-3 bg-primary/10 rounded-full">
                 <deal.icon className="h-6 w-6 text-primary" />
               </div>
              <CardTitle className="font-headline text-2xl">{deal.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-base">{deal.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={deal.link}>{deal.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
