import { Check } from 'lucide-react';
import type { Tour } from '../../../types/tour';

interface TourIncludedProps {
  tour: Tour;
}

export const TourIncluded: React.FC<TourIncludedProps> = ({ tour }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Included</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tour.includes.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};