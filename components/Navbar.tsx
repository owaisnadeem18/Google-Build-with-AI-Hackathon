'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Languages, User, MessageSquare, Plus, Home, Search, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ہ</span>
            </div>
           <span className="text-xl font-bold text-gray-900">
              {t('hunarBazar')}       
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-pink-600">
              <Home className="w-4 h-4" />
              <span>{t('home')}</span>
            </Link>
            <Link href="/browse" className="flex items-center space-x-2 text-gray-700 hover:text-pink-600">
              <Search className="w-4 h-4" />
              <span>{t('browseGigs')}</span>
            </Link>
            {user?.userType === 'freelancer' && (
              <Link href="/create-gig" className="flex items-center space-x-2 text-gray-700 hover:text-pink-600">
                <Plus className="w-4 h-4" />
                <span>{t('createGig')}</span>
              </Link>
            )}
            {user && (
              <Link href="/messages" className="flex items-center space-x-2 text-gray-700 hover:text-pink-600">
                <MessageSquare className="w-4 h-4" />
                <span>{t('messages')}</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center space-x-2"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'en' ? 'اردو' : 'English'}</span>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{user.fullName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t('profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">{t('login')}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">{t('signup')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link href="/" className="block text-gray-700 hover:text-pink-600">
              {t('home')}
            </Link>
            <Link href="/browse" className="block text-gray-700 hover:text-pink-600">
              {t('browseGigs')}
            </Link>
            {user?.userType === 'freelancer' && (
              <Link href="/create-gig" className="block text-gray-700 hover:text-pink-600">
                {t('createGig')}
              </Link>
            )}
            {user && (
              <Link href="/messages" className="block text-gray-700 hover:text-pink-600">
                {t('messages')}
              </Link>
            )}
            <div className="pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                className="w-full flex justify-start space-x-2"
              >
                <Languages className="w-4 h-4" />
                <span>{language === 'en' ? 'اردو' : 'English'}</span>
              </Button>
              {user ? (
                <>
                  <Link href="/profile" className="block mt-2 text-gray-700 hover:text-pink-600">
                    {t('profile')}
                  </Link>
                  <Button
                    variant="ghost"
                    className="mt-2 text-left w-full text-red-600"
                    onClick={logout}
                  >
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block mt-2 text-gray-700 hover:text-pink-600">
                    {t('login')}
                  </Link>
                  <Link href="/signup" className="block mt-1 text-gray-700 hover:text-pink-600">
                    {t('signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
