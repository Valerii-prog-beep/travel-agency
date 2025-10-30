export const TourWhatToBring: React.FC = () => {
  const items = [
    'Hiking boots (broken in)',
    'Waterproof jacket and pants',
    'Warm layers (fleece, down jacket)',
    'Daypack (20-30L)',
    'Water bottles (2L capacity)',
    'Headlamp with extra batteries',
    'Personal medications',
    'Camera and extra memory cards'
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Bring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};