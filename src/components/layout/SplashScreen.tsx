
"use client";

import { Logo } from "@/components/icons/Logo";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  isVisible: boolean;
}

export function SplashScreen({ isVisible }: SplashScreenProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300 ease-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "animate-popup",
        )}
      >
        <Logo />
      </div>
    </div>
  );
}
