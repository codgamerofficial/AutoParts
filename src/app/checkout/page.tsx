import Link from "next/link";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckoutPage() {
    const cartItems = products.slice(1, 3);
    const total = cartItems.reduce((acc, item) => acc + item.price, 0) + (products[0].price * 0.08);

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-extrabold font-headline mb-8 text-center">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Shipping and Payment Forms */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** 1234" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="expiry">Expiration Date</Label>
                  <Input id="expiry" placeholder="MM / YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                 <Checkbox id="same-as-shipping" />
                 <Label htmlFor="same-as-shipping" className="font-normal">Billing address is same as shipping</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Your Order</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="truncate pr-4">{item.name}</span>
                            <span className="font-medium">${item.price.toFixed(2)}</span>
                        </div>
                    ))}
                    <Separator />
                     <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Taxes</span>
                        <span>${(products[0].price * 0.08).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardHeader>
              <Button size="lg" className="w-full">Place Order</Button>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
