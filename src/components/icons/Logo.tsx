import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="140"
      height="40"
      {...props}
    >
      <style>
        {`
          .font-headline { font-family: 'Poppins', sans-serif; }
          .font-body { font-family: 'PT Sans', sans-serif; }
        `}
      </style>
      <text
        x="10"
        y="35"
        fontFamily="'Poppins', sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--primary))"
      >
        Auto
      </text>
      <text
        x="95"
        y="35"
        fontFamily="'Poppins', sans-serif"
        fontSize="30"
        fontWeight="300"
        fill="hsl(var(--foreground))"
      >
        Parts
      </text>
      <circle cx="178" cy="25" r="5" fill="hsl(var(--accent))" />
      <circle cx="190" cy="25" r="5" fill="hsl(var(--accent))" />
    </svg>
  );
}
