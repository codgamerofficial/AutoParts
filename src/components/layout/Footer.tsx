
import Link from "next/link";
import { Cog, Twitter, Facebook, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Cog className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">AutoParts.com</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for quality auto parts.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop?category=engine-parts" className="text-sm text-muted-foreground hover:text-primary">Engine Parts</Link></li>
              <li><Link href="/shop?category=brakes" className="text-sm text-muted-foreground hover:text-primary">Brakes</Link></li>
              <li><Link href="/shop?category=suspension" className="text-sm text-muted-foreground hover:text-primary">Suspension</Link></li>
              <li><Link href="/shop?category=filters" className="text-sm text-muted-foreground hover:text-primary">Filters</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQs</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Get exclusive deals and product updates.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit" variant="secondary" className="hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AutoParts.com. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
