import { SearchFilters } from '../features/SearchFilters';

export const Header = () => {
  return (
    <header className="relative h-[70vh] bg-cover bg-center bg-no-repeat">
      {/* Фоновое изображение */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/main_photo.png")'
        }}
      />
      
      {/* Темный оверлей */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Основной заголовок по центру */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-start justify-center pt-16">
        <div className="text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-10">PEAK ADVENTURES</h1>
          <p className="text-xl md:text-2xl opacity-90">Discover the world's wildest landscapes</p>
        </div>
      </div>

      {/* Фильтры внизу хедера */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <SearchFilters />
      </div>
    </header>
  );
};