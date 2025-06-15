'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import GigCard from '@/components/GigCard';
import {
  Search,
  Sparkles,
  Users,
  Shield,
  Star,
  ArrowRight,
  Scissors,
  Palette,
  Shirt
} from 'lucide-react';
import Link from 'next/link';

const mockGigs = [
  {
    id: '1',
    title: 'Custom Bridal Dress Stitching',
    description: 'Expert bridal dress designing and stitching with traditional embroidery work',
    price: 15000,
    rating: 4.9,
    reviewCount: 23,
    category: 'stitching',
    freelancer: {
      name: 'Fatima Khan',
      location: 'Lahore, Pakistan'
    },
    images: ['https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=400'],
    skills: ['Bridal Wear', 'Embroidery', 'Custom Fitting']
  },
  {
    id: '2',
    title: 'Traditional Phulkari Embroidery',
    description: 'Authentic Punjabi phulkari embroidery on dupattas and suits',
    price: 3000,
    rating: 4.8,
    reviewCount: 31,
    category: 'embroidery',
    freelancer: {
      name: 'Aisha Bibi',
      location: 'Multan, Pakistan'
    },
    images: ['https://images.pexels.com/photos/7662819/pexels-photo-7662819.jpeg?auto=compress&cs=tinysrgb&w=400'],
    skills: ['Phulkari', 'Traditional Embroidery', 'Dupatta Design']
  },
  {
    id: '3',
    title: 'Professional Suit Tailoring',
    description: 'Perfect fit suits for women with modern cuts and traditional touches',
    price: 5000,
    rating: 4.7,
    reviewCount: 18,
    category: 'tailoring',
    freelancer: {
      name: 'Zainab Ali',
      location: 'Karachi, Pakistan'
    },
    images: ['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400'],
    skills: ['Suit Tailoring', 'Custom Fitting', 'Modern Cuts']
  }
];

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [featuredGigs] = useState(mockGigs);

  const categories = [
    { key: 'stitching', icon: Scissors, color: 'bg-pink-100 text-pink-600' },
    { key: 'embroidery', icon: Palette, color: 'bg-purple-100 text-purple-600' },
    { key: 'tailoring', icon: Shirt, color: 'bg-blue-100 text-blue-600' },
  ];

  const features = [
    {
      icon: Users,
      title: 'Skilled Artisans',
      description: 'Connect with talented female freelancers from rural areas',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Safe and secure transactions with verified freelancers',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Smart recommendations and AI-enhanced services',
    },
  ];

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23f3e8ff&quot; fill-opacity=&quot;0.3&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{t('heroTitle')}</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{t('heroSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/browse">
                  <Search className="w-5 h-5 mr-2" />
                  {t('getStarted')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/signup">
                  <Star className="w-5 h-5 mr-2" />
                  {t('joinAsFreelancer')}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('popularCategories')}</h2>
              <p className="text-gray-600">{t('categorySubtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.key} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {t(category.key as any)}
                      </h3>
                      <p className="text-gray-600">
                        Expert {category.key} services by skilled artisans
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Gigs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('featuredGigs')}</h2>
                <p className="text-gray-600">Discover top-rated services from our talented freelancers</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/browse">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredGigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('howItWorks')}</h2>
              <p className="text-gray-600">Experience the future of freelancing with our AI-powered platform</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to start your journey?</h2>
            <p className="text-xl text-pink-100 mb-8">
              Join thousands of talented women showcasing their skills and connecting with clients worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Start as Freelancer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" asChild>
                <Link href="/browse">
                  Find Services
                  <Search className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}