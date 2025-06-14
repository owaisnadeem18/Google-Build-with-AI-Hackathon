'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import GigCard from '@/components/GigCard';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockGigs = [
  {
    id: '1',
    title: 'Custom Bridal Dress Stitching',
    description: 'Expert bridal dress designing and stitching with traditional embroidery work. Perfect for your special day with attention to every detail.',
    price: 15000,
    rating: 4.9,
    reviewCount: 23,
    category: 'stitching',
    freelancer: {
      name: 'Fatima Khan',
      location: 'Lahore, Pakistan'
    },
    images: ['https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=400'],
    skills: ['Bridal Wear', 'Embroidery', 'Custom Fitting', 'Traditional Designs']
  },
  {
    id: '2',
    title: 'Traditional Phulkari Embroidery',
    description: 'Authentic Punjabi phulkari embroidery on dupattas and suits with vibrant colors and traditional patterns.',
    price: 3000,
    rating: 4.8,
    reviewCount: 31,
    category: 'embroidery',
    freelancer: {
      name: 'Aisha Bibi',
      location: 'Multan, Pakistan'
    },
    images: ['https://images.pexels.com/photos/7662819/pexels-photo-7662819.jpeg?auto=compress&cs=tinysrgb&w=400'],
    skills: ['Phulkari', 'Traditional Embroidery', 'Dupatta Design', 'Hand Stitching']
  },
  {
    id: '3',
    title: 'Professional Suit Tailoring',
    description: 'Perfect fit suits for women with modern cuts and traditional touches. Professional alterations also available.',
    price: 5000,
    rating: 4.7,
    reviewCount: 18,
    category: 'tailoring',
    freelancer: {
      name: 'Zainab Ali',
      location: 'Karachi, Pakistan'
    },
    images: ['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400'],
    skills: ['Suit Tailoring', 'Custom Fitting', 'Modern Cuts', 'Alterations']
  },
  {
    id: '4',
    title: 'Handmade Kurtis & Tops',
    description: 'Beautiful handmade kurtis and tops with intricate designs and comfortable fits for everyday wear.',
    price: 2500,
    rating: 4.6,
    reviewCount: 42,
    category: 'stitching',
    freelancer: {
      name: 'Rafia Ahmed',
      location: 'Islamabad, Pakistan'
    },
    images: ['https://images.pexels.com/photos/7679641/pexels-photo-7679641.jpeg?auto=compress&cs=tinysrgb&w=400'],
    skills: ['Kurti Design', 'Hand Stitching', 'Casual Wear', 'Comfortable Fit']
  },
  {
    id: '5',
    title: 'Mirror Work Embroidery',
    description: 'Stunning mirror work embroidery on various garments. Traditional Rajasthani and Sindhi style mirror work.',
    price: 4000,
    rating: 4.8,
    reviewCount: 27,
    category: 'embroidery',
    freelancer: {
      name: 'Sania Malik',
      location: 'Hyderabad, Pakistan'
    },
    images: ['https://images.pexels.com/photos/7679748/pexels-photo-7679748.jpeg?auto=compress&cs=tinysrgb&w=400'],
    skills: ['Mirror Work', 'Traditional Embroidery', 'Sindhi Work', 'Decorative Stitching']
  },
  {
    id: '6',
    title: 'Children\'s Clothing Alterations',
    description: 'Specialized in children\'s clothing alterations and custom kids wear with fun and colorful designs.',
    price: 1500,
    rating: 4.9,
    reviewCount: 35,
    category: 'alterations',
    freelancer: {
      name: 'Mariam Sheikh',
      location: 'Faisalabad, Pakistan'
    },
    images: ['https://images.pexels.com/photos/7679715/pexels-photo-7679715.jpeg?auto=compress&cs=tinysrgb&w=400'],
    skills: ['Kids Wear', 'Alterations', 'Colorful Designs', 'Custom Sizing']
  }
];

export default function Browse() {
  const { t } = useLanguage();
  const [gigs, setGigs] = useState(mockGigs);
  const [filteredGigs, setFilteredGigs] = useState(mockGigs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [location, setLocation] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'stitching', label: t('stitching') },
    { value: 'embroidery', label: t('embroidery') },
    { value: 'tailoring', label: t('tailoring') },
    { value: 'alterations', label: t('alterations') },
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-2000', label: 'Under ₨2,000' },
    { value: '2000-5000', label: '₨2,000 - ₨5,000' },
    { value: '5000-10000', label: '₨5,000 - ₨10,000' },
    { value: '10000+', label: 'Above ₨10,000' },
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'lahore', label: 'Lahore' },
    { value: 'karachi', label: 'Karachi' },
    { value: 'islamabad', label: 'Islamabad' },
    { value: 'multan', label: 'Multan' },
    { value: 'faisalabad', label: 'Faisalabad' },
    { value: 'hyderabad', label: 'Hyderabad' },
  ];

  useEffect(() => {
    let filtered = gigs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(gig =>
        gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(gig => gig.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => parseInt(p));
      if (max) {
        filtered = filtered.filter(gig => gig.price >= min && gig.price <= max);
      } else {
        filtered = filtered.filter(gig => gig.price >= min);
      }
    }

    // Filter by location
    if (location !== 'all') {
      filtered = filtered.filter(gig => 
        gig.freelancer.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredGigs(filtered);
  }, [searchTerm, selectedCategory, priceRange, location, gigs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('browseGigs')}</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={`${t('search')} for services...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
                setLocation('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredGigs.length} results
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredGigs.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <p className="text-gray-500 text-lg">No gigs found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}