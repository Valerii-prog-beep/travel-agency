interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface TourItineraryProps {
  itinerary: ItineraryDay[];
}

export const TourItinerary: React.FC<TourItineraryProps> = ({ itinerary }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
      <div className="space-y-6">
        {itinerary.map((day) => (
          <div key={day.day} className="border-l-4 border-blue-500 pl-6 py-4">
            {/* День расписания */}
          </div>
        ))}
      </div>
    </section>
  );
};