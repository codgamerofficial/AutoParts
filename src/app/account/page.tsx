import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
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
            <CardContent className="text-center py-16 text-muted-foreground">
              <p>You have no past orders.</p>
              <Button variant="link" asChild><a href="/shop">Start Shopping</a></Button>
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
