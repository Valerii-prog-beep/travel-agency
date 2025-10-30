import { useState } from 'react';
import { Calendar, Users, Mountain, Check, AlertCircle } from 'lucide-react';
import type { Tour } from '../../../types/tour';

interface TourBookingCardProps {
  tour: Tour;
}

export const TourBookingCard: React.FC<TourBookingCardProps> = ({ tour }) => {
  const [travelersCount, setTravelersCount] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  // Парсим минимальное и максимальное количество из groupSize тура
  const parseGroupSize = () => {
    if (!tour.groupSize) return { min: 1, max: 16 };
    
    const matches = tour.groupSize.match(/(\d+)/g);
    if (matches && matches.length >= 2) {
      return {
        min: parseInt(matches[0]),
        max: parseInt(matches[1])
      };
    } else if (matches && matches.length === 1) {
      return {
        min: 1,
        max: parseInt(matches[0])
      };
    }
    
    return { min: 1, max: 16 };
  };

  const { min: minTravelers, max: maxTravelers } = parseGroupSize();
  const isBelowMinimum = travelersCount < minTravelers;
  const isAboveMaximum = travelersCount > maxTravelers;
  const isValidGroupSize = !isBelowMinimum && !isAboveMaximum;
  const totalPrice = tour.price * travelersCount;

  const handleBookNow = async () => {
    if (isBelowMinimum) {
      alert(`This tour requires minimum ${minTravelers} travelers. Please select at least ${minTravelers} traveler${minTravelers > 1 ? 's' : ''}.`);
      return;
    }
    
    if (isAboveMaximum) {
      alert(`This tour allows maximum ${maxTravelers} travelers. Please contact us for larger groups.`);
      return;
    }
    
    setIsBooking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Booking tour:', { 
        tourId: tour.id, 
        travelersCount,
        totalPrice,
        minTravelers,
        maxTravelers
      });
      
      alert(`Successfully booked ${tour.title} for ${travelersCount} traveler${travelersCount > 1 ? 's' : ''}! Our manager will contact you to confirm details.`);
      
      // Сброс формы на минимальное допустимое значение
      setTravelersCount(minTravelers);
      
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  // Генерация опций для select (1-16 человек, но с валидацией)
  const generateTravelerOptions = () => {
    const options = [];
    
    // Добавляем опции от 1 до 16
    for (let i = 1; i <= 16; i++) {
      const isDisabled = i < minTravelers || i > maxTravelers;
      
      options.push(
        <option 
          key={i} 
          value={i}
          disabled={isDisabled}
          className={isDisabled ? 'text-gray-400' : ''}
        >
          {i} traveler{i > 1 ? 's' : ''}
          {isDisabled && ` (not available for this tour)`}
        </option>
      );
    }
    
    return options;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900">${tour.price}</div>
        <div className="text-gray-600">per person</div>
      </div>

      {/* Tour Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            Duration
          </div>
          <span className="font-semibold">{tour.duration} days</span>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            Group Size
          </div>
          <span className="font-semibold">{tour.groupSize}</span>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <Mountain className="w-5 h-5" />
            Difficulty
          </div>
          <span className="font-semibold">{tour.difficulty}</span>
        </div>
      </div>

      {/* Booking Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Travelers
          </label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={travelersCount}
            onChange={(e) => setTravelersCount(Number(e.target.value))}
          >
            {generateTravelerOptions()}
          </select>
          
          {/* Предупреждения */}
          {isBelowMinimum && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              Minimum {minTravelers} traveler{minTravelers > 1 ? 's' : ''} required for this tour
            </div>
          )}
          
          {isAboveMaximum && (
            <div className="flex items-center gap-2 mt-2 text-orange-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              Maximum {maxTravelers} travelers allowed for this tour
            </div>
          )}
          
          {isValidGroupSize && (
            <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
              <Check className="w-4 h-4" />
              Valid group size for this tour
            </div>
          )}
        </div>

        {/* Total Price */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        {/* Book Now Button */}
        <button 
          onClick={handleBookNow}
          disabled={isBooking || !isValidGroupSize}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
        >
          {isBooking ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking...
            </>
          ) : (
            `Book Now - $${totalPrice}`
          )}
        </button>
      </div>

      {/* Features */}
      <div className="mt-6 text-center text-sm text-gray-500 space-y-1">
        {[
          'Free cancellation up to 30 days before',
          'Best price guarantee', 
          'Certified mountain guides',
          '24/7 customer support'
        ].map((feature, index) => (
          <p key={index} className="flex items-center justify-center gap-1">
            <Check className="w-4 h-4 text-green-500" />
            {feature}
          </p>
        ))}
      </div>
    </div>
  );
};