import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface ReservationConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'saltCave' | 'motel';
  reservationDetails: {
    date: Date;
    time?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    numberOfPeople: number;
    ticketType: string;
    price: number;
  };
}

const ReservationConfirmationModal: React.FC<ReservationConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  reservationDetails
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Potwierdź Rezerwację</h2>
              <p className="text-gray-600 mt-2">Sprawdź szczegóły rezerwacji przed potwierdzeniem</p>
            </div>

            {/* Reservation Details */}
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Szczegóły rezerwacji</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Data:</div>
                  <div className="text-gray-900">{format(reservationDetails.date, 'dd.MM.yyyy')}</div>
                  
                  {type === 'saltCave' && (
                    <>
                      <div className="text-gray-600">Godzina:</div>
                      <div className="text-gray-900">{reservationDetails.time}</div>
                    </>
                  )}
                  
                  <div className="text-gray-600">Liczba osób:</div>
                  <div className="text-gray-900">{reservationDetails.numberOfPeople}</div>
                  
                  <div className="text-gray-600">{type === 'saltCave' ? 'Rodzaj biletu:' : 'Typ pokoju:'}</div>
                  <div className="text-gray-900">{reservationDetails.ticketType}</div>
                  
                  <div className="text-gray-600">Cena:</div>
                  <div className="text-gray-900 font-medium">{reservationDetails.price} zł</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Dane kontaktowe</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Imię i nazwisko:</div>
                  <div className="text-gray-900">{reservationDetails.customerName}</div>
                  
                  <div className="text-gray-600">Email:</div>
                  <div className="text-gray-900">{reservationDetails.customerEmail}</div>
                  
                  <div className="text-gray-600">Telefon:</div>
                  <div className="text-gray-900">{reservationDetails.customerPhone}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                Potwierdź
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationConfirmationModal;