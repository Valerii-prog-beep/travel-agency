import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Tour } from '../../types/tour';

interface TourCardProps {
  tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getDestinationIcon = (destination: string) => {
    const iconMap: Record<string, string> = {
      'Swiss Alps': '🏔️',
      'Patagonia': '⛰️', 
      'Nepal': '🙏',
      'Canada': '🍁',
      'Norway': '🇳🇴'
    };
    return iconMap[destination] || '✈️';
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
      
      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-blue-50 to-cyan-100 overflow-hidden">
        <img 
          src={tour.image}
          alt={tour.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-300 animate-pulse" />
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-60">{getDestinationIcon(tour.destination)}</span>
          </div>
        )}
        
        {/* Hot Tour Badge */}
        {tour.isHot && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform transition-transform duration-300 group-hover:scale-110">
            🔥 Hot Deal
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-xl text-sm backdrop-blur-sm">
          ⏱️ {tour.duration} days
        </div>
        
        {/* Price Overlay */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-95 text-gray-900 px-4 py-2 rounded-xl shadow-md">
          <span className="text-2xl font-bold text-blue-600">${tour.price}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight pr-2">{tour.title}</h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full min-w-12">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-semibold text-gray-700">{tour.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tour.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm font-medium">
            <span className="text-lg">{getDestinationIcon(tour.destination)}</span>
            {tour.destination}
          </span>
        </div>

        {/* Заменяем button на Link */}
        <Link 
          to={`/tour/${tour.id}`}
          className="block w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-center rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};