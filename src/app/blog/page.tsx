
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    slug: "5-signs-you-need-new-brakes",
    title: "5 Signs You Need New Brakes",
    description: "Don't wait for an emergency. Learn the common warning signs that your brake system needs attention, from strange noises to a soft pedal.",
    author: "Jane Smith",
    date: "October 26, 2023",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1545089549-0a374679f64c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmFrZXN8ZW58MHx8fHwxNzU1ODU1NTM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    aiHint: "car brakes"
  },
  {
    slug: "diy-oil-change-guide",
    title: "The Ultimate DIY Oil Change Guide",
    description: "Save money and learn a valuable skill. Our step-by-step guide walks you through changing your own engine oil like a pro.",
    author: "John Doe",
    date: "October 22, 2023",
    category: "DIY",
    image: "https://images.unsplash.com/photo-1567639578138-a1b4dd6314f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxlbmdpbmUlMjBvaWx8ZW58MHx8fHwxNzU2MjY3MTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    aiHint: "engine oil"
  },
  {
    slug: "choosing-the-right-spark-plugs",
    title: "Choosing the Right Spark Plugs for Your Engine",
    description: "Copper, platinum, or iridium? We break down the differences to help you choose the best spark plugs for your vehicle's performance and longevity.",
    author: "Alex Johnson",
    date: "October 18, 2023",
    category: "Performance",
    image: "https://placehold.co/600x400.png",
    aiHint: "spark plug"
  },
];

export default function BlogPage() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold font-headline">AutoParts.com Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your source for maintenance tips, DIY guides, and performance news.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={post.aiHint}
                />
              </Link>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <Badge variant="secondary" className="mb-2">{post.category}</Badge>
              <Link href={`/blog/${post.slug}`}>
                <CardTitle className="font-headline text-xl hover:text-primary">{post.title}</CardTitle>
              </Link>
              <CardDescription className="mt-2">{post.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 text-sm text-muted-foreground">
              <span>By {post.author} on {post.date}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
