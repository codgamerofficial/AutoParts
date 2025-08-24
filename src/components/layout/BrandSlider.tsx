
"use client";

import { Audi, BMW, Chevrolet, Ford, Honda, Mercedes, Nissan, Toyota } from "@/components/icons/brands";

const brands = [
  { name: 'Ford', Icon: Ford },
  { name: 'Toyota', Icon: Toyota },
  { name: 'Honda', Icon: Honda },
  { name: 'Nissan', Icon: Nissan },
  { name: 'BMW', Icon: BMW },
  { name: 'Audi', Icon: Audi },
  { name: 'Mercedes-Benz', Icon: Mercedes },
  { name: 'Chevrolet', Icon: Chevrolet },
];

const duplicatedBrands = [...brands, ...brands];

export function BrandSlider() {
  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
    >
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_svg]:h-10 animate-infinite-scroll">
        {duplicatedBrands.map((brand, index) => (
          <li key={`brand-${index}`}>
            <brand.Icon className="w-32 h-12 object-contain text-foreground/70" />
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_svg]:h-10 animate-infinite-scroll" aria-hidden="true">
        {duplicatedBrands.map((brand, index) => (
          <li key={`brand-duplicate-${index}`}>
             <brand.Icon className="w-32 h-12 object-contain text-foreground/70" />
          </li>
        ))}
      </ul>
    </div>
  );
}
