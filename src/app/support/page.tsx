
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LifeBuoy, BookOpen, Truck, Phone } from "lucide-react";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on most unopened items. Please visit our Shipping & Returns page for full details and to initiate a return."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive an email with a tracking number. You can also find tracking information in your Order History under the 'My Account' section."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within the United States. We are working on expanding our shipping options in the future."
  },
  {
    question: "How do I know if a part will fit my vehicle?",
    answer: "We recommend using the vehicle filter on our shop page to ensure compatibility. If you are still unsure, please contact our support team with your vehicle's VIN, and we'll be happy to help."
  }
];

export default function SupportPage() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold font-headline">Customer Support</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We're here to help. Find answers to common questions or get in touch with our team.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold font-headline mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="space-y-6">
           <h2 className="text-3xl font-bold font-headline mb-6">Quick Links</h2>
           <Card>
             <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <LifeBuoy className="h-5 w-5 text-primary" />
                    <Link href="/contact" className="hover:underline">Contact Our Team</Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <Link href="/blog" className="hover:underline">Maintenance Guides & Blog</Link>
                  </li>
                   <li className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <Link href="/account" className="hover:underline">Track Your Order</Link>
                  </li>
                </ul>
             </CardContent>
           </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Need Direct Assistance?</CardTitle>
                    <CardDescription>Our support team is available to help you with any questions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/contact">
                            <Phone className="mr-2 h-4 w-4" /> Contact Us
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
