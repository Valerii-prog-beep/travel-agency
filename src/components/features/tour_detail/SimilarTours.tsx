import { Link } from 'react-router-dom';
import { toursData } from '../../../data/toursData';

interface SimilarToursProps {
  currentTourId: string;
}

export const SimilarTours: React.FC<SimilarToursProps> = ({ currentTourId }) => {
  const similarTours = toursData
    .filter(tour => tour.id !== currentTourId)
    .slice(0, 3);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarTours.map(tour => (
            <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{tour.title}</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">{tour.destination}</span>
                  <span className="text-lg font-bold text-blue-600">${tour.price}</span>
                </div>
                <Link 
                  to={`/tour/${tour.id}`}
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2 rounded-lg transition-colors"
                  onClick={() => console.log('Navigating to tour:', tour.id, tour.title)}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};