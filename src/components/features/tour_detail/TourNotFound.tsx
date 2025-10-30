import { Link } from 'react-router-dom';

export const TourNotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">The tour you're looking for doesn't exist.</p>
        <Link 
          to="/tours"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Back to All Tours
        </Link>
      </div>
    </div>
  );
};