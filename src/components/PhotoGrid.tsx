import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageModal from './ImageModal';

interface PhotoGridProps {
  images: string[];
}

const PhotoGrid = ({ images }: PhotoGridProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative aspect-[4/3] group cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image}
              alt={`Grota solna ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <span className="px-4 py-2 bg-white/90 text-gray-900 rounded-full font-serif font-medium transform scale-90 group-hover:scale-100 transition-transform duration-300">
                Powiększ
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <ImageModal
        isOpen={selectedIndex !== null}
        imageUrl={selectedIndex !== null ? images[selectedIndex] : ''}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex !== null && selectedIndex < images.length - 1}
        hasPrev={selectedIndex !== null && selectedIndex > 0}
      />
    </>
  );
};


export default PhotoGrid