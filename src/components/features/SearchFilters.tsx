import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SearchFiltersType } from '../../types/tour';

export const SearchFilters = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFiltersType>({
    destination: '',
    activity: '',
    dates: '',
    people: ''
  });

  const handleSearch = () => {
    // Собираем параметры для поиска
    const searchParams = new URLSearchParams();
    
    if (filters.destination) searchParams.append('destination', filters.destination);
    if (filters.activity) searchParams.append('activity', filters.activity);
    if (filters.dates) searchParams.append('dates', filters.dates);
    if (filters.people) searchParams.append('people', filters.people);

    // Переходим на страницу всех туров с фильтрами
    navigate(`/tours?${searchParams.toString()}`);
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {/* Destination Filter */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Destination</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              value={filters.destination}
              onChange={(e) => setFilters(prev => ({...prev, destination: e.target.value}))}
            >
              <option value="">Any Destination</option>
              <option value="Swiss Alps">Swiss Alps</option>
              <option value="Patagonia">Patagonia</option>
              <option value="Nepal">Nepal</option>
              <option value="Norway">Norway</option>
              <option value="Canada">Canada</option>
              <option value="Japan">Japan</option>
            </select>
          </div>

          {/* Activity Filter */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Activity</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              value={filters.activity}
              onChange={(e) => setFilters(prev => ({...prev, activity: e.target.value}))}
            >
              <option value="">All Activities</option>
              <option value="Hiking">Hiking</option>
              <option value="Climbing">Climbing</option>
              <option value="Skiing">Skiing</option>
              <option value="Cycling">Cycling</option>
              <option value="Kayaking">Kayaking</option>
            </select>
          </div>

          {/* Dates Filter */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Dates</label>
            <input 
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              value={filters.dates}
              onChange={(e) => setFilters(prev => ({...prev, dates: e.target.value}))}
            />
          </div>

          {/* People Filter */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Group Size</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              value={filters.people}
              onChange={(e) => setFilters(prev => ({...prev, people: e.target.value}))}
            >
              <option value="">Any Size</option>
              <option value="solo">Solo</option>
              <option value="small">2-4 People</option>
              <option value="medium">5-8 People</option>
              <option value="large">9+ People</option>
            </select>
          </div>
        </div>

        {/* Search Button - теперь с обработчиком */}
        <button 
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md text-sm"
        >
          FIND ADVENTURES
        </button>
      </div>
    </div>
  );
};