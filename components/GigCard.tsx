'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, MapPin, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface GigCardProps {
  gig: {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    reviewCount: number;
    category: string;
    freelancer: {
      name: string;
      avatar?: string;
      location: string;
    };
    images: string[];
    skills: string[];
  };
}

export default function GigCard({ gig }: GigCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={gig.images[0] || 'https://images.pexels.com/photos/7662819/pexels-photo-7662819.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={gig.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {t(gig.category as any)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1">{gig.title}</h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{gig.rating}</span>
            <span className="text-sm text-gray-500">({gig.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{gig.description}</p>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {gig.freelancer.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{gig.freelancer.name}</p>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{gig.freelancer.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {gig.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {gig.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{gig.skills.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-baseline space-x-1">
          <span className="text-sm text-gray-500">Starting at</span>
          <span className="text-lg font-bold text-green-600">₨{gig.price}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>Chat</span>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/gig/${gig.id}`}>{t('viewGig')}</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}