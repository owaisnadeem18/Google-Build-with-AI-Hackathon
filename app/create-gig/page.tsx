'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { generateGigDescription } from '@/lib/gemini';
import { Sparkles, X, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CreateGig() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    skills: [] as string[],
    currentSkill: '',
  });

  const categories = [
    { value: 'stitching', label: t('stitching') },
    { value: 'embroidery', label: t('embroidery') },
    { value: 'tailoring', label: t('tailoring') },
    { value: 'designing', label: t('designing') },
    { value: 'alterations', label: t('alterations') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user || user.userType !== 'freelancer') {
    toast.error('Only freelancers can create gigs');
    return;
  }

  if (formData.skills.length === 0) {
    toast.error('Please add at least one skill');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('/api/gigs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        userId: user.id, // Add user reference if needed
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success('Gig created successfully!');
      router.push('/browse-gigs');
    } else {
      toast.error(data.error || 'Failed to create gig');
    }
  } catch (error) {
    toast.error('Failed to create gig');
  } finally {
    setLoading(false);
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const addSkill = () => {
    if (formData.currentSkill.trim() && !formData.skills.includes(formData.currentSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.currentSkill.trim()],
        currentSkill: '',
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const generateAIDescription = async () => {
    if (!formData.title || formData.skills.length === 0) {
      toast.error('Please add a title and at least one skill first');
      return;
    }

    setAiLoading(true);
    try {
      const description = await generateGigDescription(formData.title, formData.skills);
      if (description) {
        setFormData({
          ...formData,
          description: description,
        });
        toast.success('AI description generated!');
      } else {
        toast.error('Failed to generate description');
      }
    } catch (error) {
      toast.error('AI service unavailable');
    } finally {
      setAiLoading(false);
    }
  };

  if (!user || user.userType !== 'freelancer') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-4">Only freelancers can create gigs.</p>
            <Button asChild>
              <a href="/login">Login as Freelancer</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {t('createNewGig')}
            </CardTitle>
            <p className="text-gray-600">
              Showcase your skills and connect with potential clients
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t('gigTitle')}</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="e.g., Custom Bridal Dress Stitching"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">{t('category')}</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('skills')}</Label>
                <div className="flex space-x-2">
                  <Input
                    value={formData.currentSkill}
                    onChange={(e) => setFormData({ ...formData, currentSkill: e.target.value })}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a skill and press Enter"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{skill}</span>
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">{t('gigDescription')}</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateAIDescription}
                    disabled={aiLoading}
                    className="flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{aiLoading ? 'Generating...' : 'AI Generate'}</span>
                  </Button>
                </div>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full"
                  placeholder="Describe your service in detail..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">{t('pricing')} (PKR)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="100"
                  className="w-full"
                  placeholder="Starting price in PKR"
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? t('loading') : t('createNewGig')}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}