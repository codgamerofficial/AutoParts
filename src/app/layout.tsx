
"use client";

import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { AuthModal } from '@/components/auth/AuthModal';
import { useState, useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSplashing, setIsSplashing] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const splashTimer = setTimeout(() => {
      setIsSplashing(false);
    }, 2000); // Splash screen will be visible for 2 seconds
    
    // Check for user in local storage
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user, show auth modal after splash screen
      setTimeout(() => {
         setIsAuthModalOpen(true);
      }, 2500);
    }


    return () => clearTimeout(splashTimer);
  }, []);
  
  const handleLoginSuccess = (name: string) => {
    const newUser = { name };
    setUser(newUser);
    localStorage.setItem('authUser', JSON.stringify(newUser));
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    // Optionally, force the modal to reappear on logout
    // setIsAuthModalOpen(true);
  };


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
      <body className={isMounted ? "font-body antialiased" : "font-body antialiased"}>
        <SplashScreen isVisible={isSplashing} />
        {!isSplashing && (
          <>
            <AuthModal 
              isOpen={isAuthModalOpen} 
              onOpenChange={setIsAuthModalOpen}
              onLoginSuccess={handleLoginSuccess}
            />
            <div className="flex flex-col min-h-screen bg-background/80 backdrop-blur-sm">
              <Header user={user} onLogout={handleLogout} onLoginClick={() => setIsAuthModalOpen(true)} />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </>
        )}
        <Toaster />
      </body>
    </html>
  );
