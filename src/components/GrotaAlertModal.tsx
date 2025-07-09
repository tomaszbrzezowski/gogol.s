import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, X, Calendar } from 'lucide-react';

interface GrotaAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GrotaAlertModal: React.FC<GrotaAlertModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Calendar className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Rezerwacja w Grocie Solnej & Saunie</h2>
                  <div className="mt-2">
                    <p className="text-lg text-gray-800 mb-6">
                      Rezerwacje dostępne <span className="font-bold text-red-600">wyłącznie telefonicznie</span>
                    </p>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <Phone className="h-6 w-6 text-red-600 mr-3" />
                        <div>
                          <p className="font-bold text-red-600 text-xl">+48 571 376 456</p>
                          <p className="text-sm text-red-600">Grota Solna & Sauna - Zadzwoń teraz</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <MapPin className="h-6 w-6 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">Grota Solna & Sauna Gogol's</p>
                          <p className="text-gray-600">ul. Kamieńskiego 221/U1</p>
                          <p className="text-gray-600">51-577 Wrocław</p>
                        </div>
                      </div>
                    </div>
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

export default GrotaAlertModal;