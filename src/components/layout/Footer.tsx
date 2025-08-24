
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
              <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-primary">All Parts</Link></li>
              <li><Link href="/brands" className="text-sm text-muted-foreground hover:text-primary">Brands</Link></li>
              <li><Link href="/deals" className="text-sm text-muted-foreground hover:text-primary">Deals</Link></li>
              <li><Link href="/loyalty" className="text-sm text-muted-foreground hover:text-primary">Loyalty Program</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
             <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About AutoParts.com</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/support" className="text-sm text-muted-foreground hover:text-primary">Support Center</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/account" className="text-sm text-muted-foreground hover:text-primary">Track Order</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AutoParts.com. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
