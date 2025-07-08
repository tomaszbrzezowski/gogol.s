import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, X } from 'lucide-react';

interface CombinedContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CombinedContactModal: React.FC<CombinedContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4 min-h-screen"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Rezerwacje</h2>
              <p className="text-gray-600">
                Skontaktuj się z nami:
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+48533541114"
                className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group"
              >
                <Phone className="h-6 w-6 text-red-500 mr-3 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-red-900">+48 533 541 114</p>
                  <p className="text-sm text-red-600">Grota Solna - Zadzwoń</p>
                </div>
              </a>
              
              <a
                href="tel:+48606412706"
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <Phone className="h-6 w-6 text-blue-500 mr-3 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-blue-900">+48 606 412 706</p>
                  <p className="text-sm text-blue-600">Pensjonat - Zadzwoń</p>
                </div>
              </a>

              <a
                href="mailto:gogol.s@wp.pl"
                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
              >
                <Mail className="h-6 w-6 text-green-500 mr-3 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-green-900">gogol.s@wp.pl</p>
                  <p className="text-sm text-green-600">Wyślij email</p>
                </div>
              </a>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Grota Solna Gogol's</p>
                    <p className="text-gray-600">ul. Kamieńskiego 221/U1</p>
                    <p className="text-gray-600">51-126 Wrocław</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Pensjonat Gogol's</p>
                    <p className="text-gray-600">ul. Milicka 60</p>
                    <p className="text-gray-600">51-126 Wrocław</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CombinedContactModal;