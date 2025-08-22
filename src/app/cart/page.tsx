
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const cartItems = products.slice(0, 3).map((product, index) => ({
    ...product,
    quantity: index + 1,
  }));
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-extrabold font-headline mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16 border rounded-lg">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <Button asChild className="mt-4">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="flex items-center p-4">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <Link href={`/product/${item.slug}`} className="font-semibold hover:text-primary">{item.name}</Link>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Input type="number" value={item.quantity} className="w-16 h-9 text-center" readOnly />
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
