
"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ShoppingCart,
  UserCircle,
  Menu,
  Cog,
  Heart,
  LogOut,
  Sun,
  Moon,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";
import { SearchResults } from "@/components/search/SearchResults";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/brands", label: "Brands" },
  { href: "/deals", label: "Deals" },
  { href: "/loyalty", label: "Loyalty" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
];

interface HeaderProps {
  user: { name: string } | null;
  onLogout: () => void;
  onLoginClick: () => void;
}


export function Header({ user, onLogout, onLoginClick }: HeaderProps) {
  const { setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.brand.toLowerCase().includes(lowercasedQuery) ||
          product.category.toLowerCase().includes(lowercasedQuery)
      );
      setSearchResults(results);
      setIsPopoverOpen(true);
    } else {
      setSearchResults([]);
      setIsPopoverOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = () => {
    setIsPopoverOpen(false);
    setSearchQuery("");
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Cog className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">AutoParts.com</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <Cog className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline text-lg">AutoParts.com</span>
                </Link>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="px-2 py-1 text-lg transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="ml-2 flex items-center space-x-2 md:hidden">
            <Cog className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-base">AutoParts.com</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-1 sm:space-x-2">
          <div className="flex-1 sm:max-w-xs ml-auto" ref={searchRef}>
             <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild className="w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search parts..."
                      className="pl-9 h-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery.length > 1 && setIsPopoverOpen(true)}
                    />
                  </div>
                </PopoverTrigger>
                 <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                   <SearchResults results={searchResults} onResultClick={handleResultClick} />
                </PopoverContent>
              </Popover>
          </div>
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
           {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Hello, {user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Welcome back!
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/account">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                   <Link href="/loyalty">
                    <Award className="mr-2 h-4 w-4" />
                    <span>My Rewards</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" onClick={onLoginClick}>
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
