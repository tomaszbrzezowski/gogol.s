import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const ImageModal = ({ isOpen, imageUrl, onClose, onNext, onPrev, hasNext, hasPrev }: ImageModalProps) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && hasNext && onNext) {
      onNext();
    } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
      onPrev();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full h-full flex items-center justify-center p-4"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            {/* Navigation Buttons */}
            {hasPrev && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev?.();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
              >
                <ChevronLeft size={24} />
              </motion.button>
            )}
            
            {hasNext && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
              >
                <ChevronRight size={24} />
              </motion.button>
            )}
            
            <img
              src={imageUrl}
              alt="Full screen view"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;