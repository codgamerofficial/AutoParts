
"use client";

import './globals.css';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { AuthModal } from '@/components/auth/AuthModal';
import { useState, useEffect } from 'react';
import type { Product, CartItem } from '@/lib/types';
import { products } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toast } = useToast();
  const [isSplashing, setIsSplashing] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);


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
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlist(prev => {
        if (prev.find(item => item.id === product.id)) {
            toast({ title: "Already in wishlist", description: `${product.name} is already in your wishlist.`});
            return prev;
        }
        toast({ title: "Added to wishlist", description: `${product.name} has been added to your wishlist.`});
        return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };
  
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
     toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    const newQuantity = Math.max(1, quantity);
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };


  // Enhance children with props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // @ts-ignore - cloning to pass props
      return React.cloneElement(child, {
        wishlist,
        onAddToWishlist: handleAddToWishlist,
        onRemoveFromWishlist: handleRemoveFromWishlist,
        cartItems,
        onAddToCart: handleAddToCart,
        onRemoveFromCart: handleRemoveFromCart,
        onUpdateCartQuantity: handleUpdateCartQuantity,
      });
    }
    return child;
  });

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>AutoParts.com - Quality Auto Parts</title>
        <meta name="description" content="Your reliable source for high-quality auto parts and accessories." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SplashScreen isVisible={isSplashing} />
        {!isSplashing && (
          <>
            <AuthModal 
              isOpen={isAuthModalOpen} 
              onOpenChange={setIsAuthModalOpen}
              onLoginSuccess={handleLoginSuccess}
            />
            <div className="flex flex-col min-h-screen bg-background">
              <Header 
                user={user} 
                onLogout={handleLogout} 
                onLoginClick={() => setIsAuthModalOpen(true)}
              />
              <main className="flex-grow">{childrenWithProps}</main>
              <Footer />
            </div>
          </>
        )}
        <Toaster />
      </body>
    </html>
  );
}
