
"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { AuthModal } from '@/components/auth/AuthModal';
import { useState, useEffect } from 'react';
import type { Product, CartItem } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const [isSplashing, setIsSplashing] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
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
    if (isNaN(newQuantity)) return;
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

  return (
    <>
      <SplashScreen isVisible={isSplashing} />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen}
        onLoginSuccess={handleLoginSuccess}
      />
      <div className={`flex flex-col min-h-screen bg-background ${isSplashing ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
        <Header 
          user={user} 
          onLogout={handleLogout} 
          onLoginClick={() => setIsAuthModalOpen(true)}
        />
        <main className="flex-grow">{childrenWithProps}</main>
        <Footer />
      </div>
    </>
  );
}
