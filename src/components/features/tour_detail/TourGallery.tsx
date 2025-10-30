import { Gallery } from '../Gallery';

interface TourGalleryProps {
  images: string[];
  tourTitle: string;
}

export const TourGallery: React.FC<TourGalleryProps> = ({ images, tourTitle }) => {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Photo Gallery</h2>
      <Gallery images={images} tourTitle={tourTitle} />
    </section>
  );
};