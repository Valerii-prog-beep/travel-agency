import { Mountain, Users, Home, Utensils } from 'lucide-react';
import type { Tour } from '../../../types/tour';

interface TourDetailsProps {
  tour: Tour;
}

export const TourDetails: React.FC<TourDetailsProps> = ({ tour }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Tour Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Mountain className="w-6 h-6 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-900">Difficulty</div>
            <div className="text-gray-600">{tour.difficulty || 'Moderate'}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Users className="w-6 h-6 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-900">Group Size</div>
            <div className="text-gray-600">{tour.groupSize || '4-12 people'}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Home className="w-6 h-6 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-900">Accommodation</div>
            <div className="text-gray-600">{tour.accommodation || 'Mountain huts & hotels'}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Utensils className="w-6 h-6 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-900">Meals</div>
            <div className="text-gray-600">All meals included</div>
          </div>
        </div>
      </div>
    </section>
  );
};