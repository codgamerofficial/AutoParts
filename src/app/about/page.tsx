import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      <section className="bg-card py-20 text-center">
        <div className="container">
          <h1 className="text-5xl font-extrabold font-headline">About AutoParts.com</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Driving your passion with quality parts and expert advice.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At AutoParts.com, our mission is to empower car enthusiasts and everyday drivers alike by providing easy access to high-quality, reliable auto parts. We believe that maintaining and upgrading your vehicle should be a straightforward and satisfying experience. We are committed to offering a comprehensive selection, competitive prices, and the expert knowledge you need to get the job done right.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We strive to be more than just a retailer; we aim to be a trusted partner in your automotive journey. From routine maintenance to performance upgrades, we're here to support you every step of the way with durable parts and unparalleled customer service.
            </p>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1579828819445-5635384c0535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3YXJlaG91c2UlMjBjYXIlMjBwYXJ0c3xlbnwwfHx8fDE3NTU4NTU1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="AutoParts.com warehouse"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="warehouse car parts"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
