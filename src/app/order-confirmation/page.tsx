
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { products } from '@/lib/data';

export default function OrderConfirmationPage() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Generate a random mock order ID only on the client side
    setOrderId(`ORD-${Math.floor(Math.random() * 90000) + 10000}`);
  }, []);

  const cartItems = products.slice(1, 3);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-extrabold font-headline mt-4">Thank You For Your Order!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your order has been placed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orderId && (
            <div className="text-center bg-muted p-3 rounded-md mb-6">
              <p className="text-sm">Your Order ID is: <span className="font-bold text-primary">{orderId}</span></p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-headline text-xl font-semibold">Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">${item.price.toFixed(2)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Taxes</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
