import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TourCard } from '../components/features/TourCard';
import { toursData } from '../data/toursData';
import type { Tour } from '../types/tour';
import { TourNavigation} from '../components/features/tour_detail';

export const ToursPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredTours, setFilteredTours] = useState<Tour[]>(toursData);

  useEffect(() => {
    // Получаем параметры фильтрации из URL
    const destination = searchParams.get('destination');
    const activity = searchParams.get('activity');
    const dates = searchParams.get('dates');
    const people = searchParams.get('people');

    // Фильтруем туры
    let filtered = toursData;

    // Фильтр по направлению
    if (destination) {
      filtered = filtered.filter(tour => 
        tour.destination.toLowerCase().includes(destination.toLowerCase()) ||
        tour.location.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Фильтр по активности - точное совпадение с массивом activities
    if (activity) {
      filtered = filtered.filter(tour => 
        tour.activities.some(act => 
          act.toLowerCase() === activity.toLowerCase()
        )
      );
    }

    // Фильтр по дате - проверка доступных дат начала тура
    if (dates) {
      filtered = filtered.filter(tour => 
        tour.availableDates.some(availableDate => availableDate === dates)
      );
    }

    // Фильтр по размеру группы
    if (people) {
      filtered = filtered.filter(tour => {
        switch (people) {
          case 'solo':
            return tour.maxGroupSize >= 1;
          case 'small':
            return tour.maxGroupSize >= 2 && tour.maxGroupSize <= 4;
          case 'medium':
            return tour.maxGroupSize >= 5 && tour.maxGroupSize <= 8;
          case 'large':
            return tour.maxGroupSize >= 9;
          default:
            return true;
        }
      });
    }

    setFilteredTours(filtered);
  }, [searchParams]);

  const handleShowAllTours = () => {
    navigate('/tours');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TourNavigation />
      <div className="container mx-auto px-6 py-12">
        {/* Заголовок с результатами */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {filteredTours.length} {filteredTours.length === 1 ? 'Adventure Tour' : 'Adventure Tours'} Found
          </h1>
          <p className="text-xl text-gray-600">
            Discover all our curated adventures around the world
          </p>
          
          {/* Показать активные фильтры */}
          {(searchParams.get('destination') || searchParams.get('activity') || searchParams.get('dates') || searchParams.get('people')) && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {searchParams.get('destination') && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Destination: {searchParams.get('destination')}
                </span>
              )}
              {searchParams.get('activity') && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Activity: {searchParams.get('activity')}
                </span>
              )}
              {searchParams.get('dates') && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Date: {new Date(searchParams.get('dates')!).toLocaleDateString()}
                </span>
              )}
              {searchParams.get('people') && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  Group: {searchParams.get('people')}
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Сетка туров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* Сообщение если туры не найдены */}
        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏔️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any tours matching your search criteria. 
                Try adjusting your filters or browse all our adventures.
              </p>
              <button 
                onClick={handleShowAllTours}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Show All Tours
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};