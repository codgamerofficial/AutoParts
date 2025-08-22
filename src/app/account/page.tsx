
"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const orders = [
  {
    id: "ORD-001",
    date: "2023-12-15",
    status: "Delivered",
    total: 149.98,
    items: [
      { ...products[0], quantity: 1 },
      { ...products[1], quantity: 1 },
    ]
  },
  {
    id: "ORD-002",
    date: "2024-01-05",
    status: "Shipped",
    total: 84.49,
    items: [
      { ...products[2], quantity: 1 },
      { ...products[7], quantity: 3 },
    ]
  }
];


export default function AccountPage() {
  const { toast } = useToast();

  const handleTrackOrder = (orderId: string) => {
    toast({
      title: `Tracking Order ${orderId}`,
      description: "Your order has been shipped and is on its way. Estimated delivery: 3-5 business days.",
    });
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-extrabold font-headline mb-8">My Account</h1>
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders and their status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <p>You have no past orders.</p>
                  <Button variant="link" asChild><a href="/shop">Start Shopping</a></Button>
                </div>
              ) : (
                orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="flex flex-row justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">Order {order.id}</CardTitle>
                        <CardDescription>Date: {order.date}</CardDescription>
                      </div>
                      <div className="text-right">
                          <Badge 
                            variant={order.status === 'Delivered' ? 'secondary' : 'default'}
                            className={order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {order.status}
                          </Badge>
                          <p className="text-lg font-bold mt-1">${order.total.toFixed(2)}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center">
                             <Image
                                src={item.images[0]}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="rounded-md object-cover"
                              />
                              <div className="ml-4 flex-grow">
                                <Link href={`/product/${item.slug}`} className="font-semibold hover:text-primary">{item.name}</Link>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline">View Order</Button>
                        <Button onClick={() => handleTrackOrder(order.id)}>Track Order</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <Separator/>
               <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button className="mt-4">Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="addresses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses.</CardDescription>
              </div>
              <Button>Add New Address</Button>
            </CardHeader>
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Main Shipping Address</CardTitle>
                   <CardDescription>Default</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>John Doe</p>
                  <p>123 Main St, Anytown, 12345</p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
