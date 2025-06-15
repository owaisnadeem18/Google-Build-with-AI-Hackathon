import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { mockGigs } from '@/app/data/gigs';
export async function generateStaticParams() {
  return mockGigs.map((gig) => ({ id: gig.id }));
}

export default function GigPage({ params }: { params: { id: string } }) {
  const gig = mockGigs.find((g) => g.id === params.id);

  if (!gig) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Title & Freelancer */}
      <h1 className="text-3xl font-bold mb-2">{gig.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        by <span className="font-semibold">{gig.freelancer.name}</span> — {gig.freelancer.location}
      </p>

      {/* Image Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {gig.images.map((img, i) => (
          <div key={i} className="relative h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src={img}
              alt={`Gig image ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">{gig.description}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {gig.skills.map((skill, i) => (
            <Badge key={i} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </div>

      {/* Price & Rating */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-gray-100 p-6 rounded-lg shadow-sm mb-10">
        <div>
          <p className="text-gray-700 text-lg">
            Price: <span className="text-primary font-semibold">₨{gig.price.toLocaleString()}</span>
          </p>
          <p className="flex items-center text-yellow-500 mt-1">
            <Star className="w-4 h-4 mr-1" />
            {gig.rating} <span className="text-gray-600 ml-1">({gig.reviewCount} reviews)</span>
          </p>
        </div>
        <Button className="text-white">Continue</Button>
      </div>
    </div>
  );
}
