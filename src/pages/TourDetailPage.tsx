import { useParams } from 'react-router-dom';
import { toursData } from '../data/toursData';
import { 
  TourNavigation,
  TourGallery,
  TourHero,
  TourDescription,
  TourIncluded,
  TourBookingCard,
  SimilarTours,
  TourNotFound
} from '../components/features/tour_detail';

export const TourDetailPage = () => {
  const { id } = useParams();
  const tour = toursData.find(t => t.id === id);

  if (!tour) {
    return <TourNotFound />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <TourNavigation />
      
      
      
      {/* Hero with Title */}
      <TourHero 
        tour={tour}
        
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2 space-y-12">
            <TourDescription tour={tour} />
            <TourIncluded tour={tour} />
            {/* Gallery */}
            <TourGallery images={tour.gallery} tourTitle={tour.title} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <TourBookingCard 
              tour={tour}
              
            />
          </div>
        </div>
      </div>

      

      {/* Similar Tours */}
      <SimilarTours currentTourId={tour.id} />
    </div>
  );
};