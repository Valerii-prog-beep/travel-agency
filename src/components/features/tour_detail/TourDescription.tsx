import type { Tour } from '../../../types/tour';

interface TourDescriptionProps {
  tour: Tour;
}

export const TourDescription: React.FC<TourDescriptionProps> = ({ tour }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Tour Description</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">{tour.description}</p>
      <p className="text-lg text-gray-700 leading-relaxed">
        This carefully curated adventure combines physical challenge with breathtaking natural beauty. 
        Our expert guides will ensure your safety while providing fascinating insights into the local 
        ecology and geography. Perfect for adventure seekers looking to push their limits in a 
        supportive environment.
      </p>
    </section>
  );
};