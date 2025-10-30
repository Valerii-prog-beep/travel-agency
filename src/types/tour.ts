export interface Tour {
  id: string;
  title: string;
  destination: string;
  price: number;
  duration: number; // длительность в днях
  image: string;
  rating: number;
  isHot: boolean;
  description: string;
  includes: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  groupSize: string; // '1-4', '5-8', '9-12', '13+'
  accommodation: string; // 'Hotel', 'Camping', 'Hostel', 'Lodge'
  gallery: string[];
  activities: string[]; // ['hiking', 'climbing', 'skiing'] - для точной фильтрации
  availableDates: string[]; // массив доступных дат начала тура ['2024-06-01', '2024-06-15']
  maxGroupSize: number; // максимальный размер группы
  location: string; // конкретное место назначения
}

export interface SearchFiltersType {
  destination: string;
  activity: string;
  dates: string; // желаемая дата начала тура
  people: string; // желаемый размер группы
}

// Вспомогательные типы для расширенной фильтрации
export interface ExtendedSearchFilters {
  destination: string;
  activity: string;
  dates: string;
  people: string;
  priceMin?: number;
  priceMax?: number;
  durationMin?: number;
  durationMax?: number;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Expert' | '';
  minRating?: number;
}

// Тип для отображения тура в карточке
export interface TourCardProps {
  tour: Tour;
  className?: string;
}

// Тип для параметров URL
export interface TourSearchParams {
  destination?: string;
  activity?: string;
  dates?: string;
  people?: string;
}