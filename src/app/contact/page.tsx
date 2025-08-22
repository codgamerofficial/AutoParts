import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold font-headline">Get In Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have questions or need help with a part? We're here for you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Our team will get back to you within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Order question, part fitment, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help?" rows={5} />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>
        <div className="space-y-8">
            <h3 className="text-2xl font-bold font-headline">Contact Information</h3>
            <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 mt-1 text-primary"/>
                <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">support@autoparts.com</p>
                </div>
            </div>
             <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 mt-1 text-primary"/>
                <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
            </div>
             <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 mt-1 text-primary"/>
                <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-muted-foreground">123 Auto Drive, Mechanicville, USA</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
