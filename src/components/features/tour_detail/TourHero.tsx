import { MapPin, Star } from 'lucide-react';
import type { Tour } from '../../../types/tour';

interface TourHeroProps {
  tour: Tour;
}

export const TourHero: React.FC<TourHeroProps> = ({ tour }) => {
  return (
    <div className="relative h-96 bg-gray-200">
      <img 
        src={tour.image} 
        alt={tour.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 z-10"  />
      <div className="absolute bottom-6 left-6 text-white z-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{tour.title}</h1>
        <div className="flex items-center gap-4 text-lg">
          <span className="flex items-center gap-1">
            <MapPin className="w-5 h-5" />
            {tour.destination}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400" />
            {tour.rating}
          </span>
          {tour.isHot && (
            <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold">
              🔥 Hot Deal
            </span>
          )}
        </div>
      </div>
    </div>
  );
};