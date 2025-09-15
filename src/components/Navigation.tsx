'use client';

import { useState } from 'react';

import { Home, Mail, Menu, MessageCircle, User, X } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { path: '/' as Route, label: 'Home', icon: Home },
    { path: '/experience' as Route, label: 'Experience', icon: User },
    { path: '/chat' as Route, label: 'Chat', icon: MessageCircle },
    { path: '/contact' as Route, label: 'Contact', icon: Mail },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between md:justify-center">
          {/* Mobile brand (left) */}
          <div className="md:hidden text-sm font-light text-foreground">José Mota</div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-light transition-all duration-300 ${
                  isActive(path) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button (right) */}
          <div className="md:hidden ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 bg-black text-white hover:bg-black hover:text-white active:bg-black active:text-white focus:bg-black focus:text-white"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 text-base font-light transition-all duration-300 ${
                    isActive(path)
                      ? 'text-primary bg-secondary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
