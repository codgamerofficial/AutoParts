
"use client";

import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { useState, useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSplashing, setIsSplashing] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsSplashing(false);
    }, 2000); // Splash screen will be visible for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={isMounted ? "scroll-smooth dark" : "scroll-smooth"}>
      <head>
        <title>AutoParts.com - Quality Auto Parts</title>
        <meta name="description" content="Your reliable source for high-quality auto parts and accessories." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={isMounted ? "font-body antialiased animated-background" : "font-body antialiased"}>
        <SplashScreen isVisible={isSplashing} />
        {!isSplashing && (
          <div className="flex flex-col min-h-screen bg-background/80 backdrop-blur-sm">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        )}
        <Toaster />
      </body>
    </html>
  );
}
