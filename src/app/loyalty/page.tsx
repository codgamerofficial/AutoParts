
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Gift, Send, Star, UserPlus, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const tiers = [
  {
    name: "Member",
    points: "0+ Points",
    color: "text-gray-500",
    features: ["1x points on purchases", "Early access to sales"],
  },
  {
    name: "Insider",
    points: "1,000+ Points",
    color: "text-blue-500",
    features: ["1.25x points on purchases", "Birthday gift", "Free standard shipping"],
  },
  {
    name: "VIP",
    points: "5,000+ Points",
    color: "text-amber-500",
    features: ["1.5x points on purchases", "VIP exclusive offers", "Dedicated support line"],
  },
];

export default function LoyaltyPage() {
  const referralCode = "FRIEND-A1B2C3";

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-16">
      <section className="text-center mb-16">
        <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
          <Award className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-5xl font-extrabold font-headline">Loyalty & Referrals</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join our rewards program to earn points, get exclusive perks, and save on every purchase.
        </p>
        <Button size="lg" className="mt-6">Join Now & Get 50 Bonus Points</Button>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-muted rounded-full mb-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-headline">1. Join for Free</h3>
            <p className="text-muted-foreground mt-2">
              Create an account and you're automatically enrolled in our loyalty program.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-muted rounded-full mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-headline">2. Earn Points</h3>
            <p className="text-muted-foreground mt-2">
              Earn points for every dollar you spend, writing reviews, and more.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-muted rounded-full mb-4">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-headline">3. Redeem Rewards</h3>
            <p className="text-muted-foreground mt-2">
              Use your points to get discounts on future purchases.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-10">Membership Tiers</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col">
              <CardHeader className="items-center text-center">
                <Star className={`h-8 w-8 ${tier.color} fill-current`} />
                <CardTitle className={`font-headline text-2xl ${tier.color}`}>{tier.name}</CardTitle>
                <CardDescription>{tier.points}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <Separator />
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                 <Button variant={tier.name === 'Member' ? 'default' : 'outline'} className="w-full">
                  {tier.name === 'Member' ? 'You are here' : 'Learn More'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted rounded-lg p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold font-headline">Refer a Friend, Get Rewarded</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Love our parts? Share the love! Give your friends $20 off their first order of $100 or more, and you'll get $20 in points (2,000 points) for each successful referral.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Your Unique Referral Code</CardTitle>
              <CardDescription>Share this code with your friends.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 p-3 bg-background border rounded-md">
                <p className="text-lg font-mono text-primary flex-grow">{referralCode}</p>
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
             <CardFooter>
                <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Share Now
                </Button>
             </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}


function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
