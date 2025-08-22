
"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Landmark, IndianRupee, Wallet } from "lucide-react";

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const cartItems = products.slice(1, 3);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

  return (
    <div className="container py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold font-headline mb-4">Checkout</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
            Please review your order and complete your purchase.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-3 gap-12">
        {/* Shipping and Payment Forms */}
        <div className="lg:col-span-2 space-y-8">
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
              <CardTitle className="font-headline text-2xl">Payment Method</CardTitle>
              <CardDescription>Select a payment option</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Label
                  htmlFor="payment-card"
                  className={`flex items-center space-x-4 p-4 rounded-md border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary ring-2 ring-primary' : ''}`}
                >
                  <RadioGroupItem value="card" id="payment-card" />
                  <CreditCard className="h-6 w-6" />
                  <div className="flex-grow">
                    <p className="font-semibold">Credit/Debit Card</p>
                    <p className="text-sm text-muted-foreground">For Visa, Mastercard, Amex</p>
                  </div>
                </Label>
                <Label
                  htmlFor="payment-upi"
                  className={`flex items-center space-x-4 p-4 rounded-md border cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-primary ring-2 ring-primary' : ''}`}
                >
                  <RadioGroupItem value="upi" id="payment-upi" />
                  <IndianRupee className="h-6 w-6" />
                  <div className="flex-grow">
                    <p className="font-semibold">UPI</p>
                     <p className="text-sm text-muted-foreground">For users in India</p>
                  </div>
                </Label>
                <Label
                  htmlFor="payment-bank"
                  className={`flex items-center space-x-4 p-4 rounded-md border cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-primary ring-2 ring-primary' : ''}`}
                >
                   <RadioGroupItem value="bank" id="payment-bank" />
                   <Landmark className="h-6 w-6" />
                   <div className="flex-grow">
                     <p className="font-semibold">Online Banking</p>
                      <p className="text-sm text-muted-foreground">For US & International banks</p>
                   </div>
                </Label>
                 <Label
                  htmlFor="payment-paypal"
                  className={`flex items-center space-x-4 p-4 rounded-md border cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-primary ring-2 ring-primary' : ''}`}
                >
                   <RadioGroupItem value="paypal" id="payment-paypal" />
                   <Wallet className="h-6 w-6" />
                   <div className="flex-grow">
                     <p className="font-semibold">Digital Wallet</p>
                      <p className="text-sm text-muted-foreground">Use PayPal or similar services</p>
                   </div>
                </Label>
              </RadioGroup>
              <div className="mt-6">
                {paymentMethod === "card" && (
                  <div className="space-y-4">
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
                  </div>
                )}
                {paymentMethod === "upi" && (
                    <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input id="upi-id" placeholder="yourname@bank" />
                         <Button className="mt-2 w-full">Verify & Pay</Button>
                    </div>
                )}
                 {paymentMethod === "bank" && (
                    <div className="text-center">
                       <Button className="w-full">Proceed to Bank</Button>
                    </div>
                )}
                 {paymentMethod === "paypal" && (
                    <div className="text-center">
                       <Button className="w-full">Proceed to PayPal</Button>
                    </div>
                )}
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
                            <span className="font-medium">{item.name}</span>
                            <span className="text-muted-foreground">${item.price.toFixed(2)}</span>
                        </div>
                    ))}
                    <Separator />
                     <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Taxes</span>
                        <span className="text-muted-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full">Place Order</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
