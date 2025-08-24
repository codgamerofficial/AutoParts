
import type { SVGProps } from "react";

// Note: These are simplified, monochrome logo representations for demonstration purposes.

export function Ford(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 75" {...props}>
      <ellipse cx="100" cy="37.5" rx="95" ry="35" fill="none" stroke="currentColor" strokeWidth="5" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="38" fontWeight="bold" fill="currentColor" fontFamily="serif">FORD</text>
    </svg>
  );
}

export function Toyota(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 135" {...props}>
      <ellipse cx="100" cy="70" rx="90" ry="60" fill="none" stroke="currentColor" strokeWidth="15" />
      <ellipse cx="100" cy="70" rx="30" ry="58" fill="none" stroke="currentColor" strokeWidth="15" />
      <path d="M10,70 H190" stroke="currentColor" strokeWidth="15" />
    </svg>
  );
}

export function Honda(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 100" {...props}>
        <path d="M10 90 V 10 H 30 V 40 H 90 V 10 H 110 V 90 H 90 V 60 H 30 V 90 Z" fill="currentColor" />
    </svg>
  );
}

export function Nissan(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 60" {...props}>
      <circle cx="100" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="6"/>
      <path d="M30 30 H 170" fill="none" stroke="currentColor" strokeWidth="7"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontWeight="bold" fill="currentColor" fontFamily="sans-serif" className="text-background" paintOrder="stroke" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">NISSAN</text>
    </svg>
  );
}

export function BMW(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="40" fill="currentColor" />
      <path d="M50 10 A 40 40 0 0 1 50 90" fill="#FFF" />
      <path d="M50 10 A 40 40 0 0 0 50 90" fill="#FFF" />
      <path d="M10 50 A 40 40 0 0 0 90 50" fill="#3899d4" />
      <path d="M10 50 A 40 40 0 0 1 90 50" fill="#3899d4" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
      <text x="50%" y="22%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontWeight="bold" fill="currentColor">B</text>
      <text x="50%" y="38%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontWeight="bold" fill="currentColor">M</text>
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontWeight="bold" fill="currentColor">W</text>
    </svg>
  );
}

export function Audi(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 200 50" {...props}>
            <circle cx="25" cy="25" r="22" stroke="currentColor" strokeWidth="6" fill="none" />
            <circle cx="75" cy="25" r="22" stroke="currentColor" strokeWidth="6" fill="none" />
            <circle cx="125" cy="25" r="22" stroke="currentColor" strokeWidth="6" fill="none" />
            <circle cx="175" cy="25" r="22" stroke="currentColor" strokeWidth="6" fill="none" />
        </svg>
    );
}

export function Mercedes(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 100 100" {...props}>
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="none" />
            <path d="M50 5 L50 50 L89.3 75 M50 50 L10.7 75 M50 50 L50 95" stroke="currentColor" strokeWidth="6" fill="none" />
        </svg>
    );
}

export function Chevrolet(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 200 60" {...props}>
            <path d="M0 20 L70 20 L80 0 L120 0 L130 20 L200 20 L200 40 L130 40 L120 60 L80 60 L70 40 L0 40 Z" fill="currentColor" stroke="hsl(var(--card))" strokeWidth="4"/>
        </svg>
    );
}
