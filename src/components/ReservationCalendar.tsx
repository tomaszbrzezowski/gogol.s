import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { SaltCaveReservation, MotelReservation } from '../lib/supabase';
import { User, Phone, Mail } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import ReservationConfirmationModal from './ReservationConfirmationModal';

interface TimeSlot {
  time: string;
  isAvailable: boolean;
  reservation?: SaltCaveReservation;
}

interface DayAvailability {
  [key: string]: boolean;
}
interface ReservationCalendarProps {
  type: 'saltCave' | 'motel';
  onReservationSubmit: (data: any) => void;
}

const SALT_CAVE_TICKET_TYPES = [
  { id: 'normal', name: 'Bilet Normalny', price: 21 },
  { id: 'reduced', name: 'Bilet Ulgowy', price: 17 },
  { id: 'normal-pass', name: 'Karnet Normalny', price: 180 },
  { id: 'reduced-pass', name: 'Karnet Ulgowy', price: 140 },
  { id: 'family-1-1', name: 'Karnet 1+1', price: 288 },
  { id: 'family-2-1', name: 'Karnet 2+1', price: 450 },
  { id: 'family-2-2', name: 'Karnet 2+2', price: 576 },
];

const ROOM_TYPES = [
  { id: 'single-shared', name: 'Pokój 1-osobowy z łazienką ogólną', price: 90 },
  { id: 'single-private', name: 'Pokój 1-osobowy z łazienką', price: 120 },
  { id: 'double-shared', name: 'Pokój 2-osobowy z łazienką ogólną', price: 120 },
  { id: 'double-private', name: 'Pokój 2-osobowy z łazienką', price: 160 },
  { id: 'triple', name: 'Pokój 3-osobowy z łazienką', price: 210 },
  { id: 'quad', name: 'Pokój 4-osobowy z łazienką', price: 280 },
];

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({ type, onReservationSubmit }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfPeople: 1
  });
  const [selectedTicketType, setSelectedTicketType] = useState(type === 'saltCave' ? 'normal' : 'single-shared');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [dayAvailability, setDayAvailability] = useState<DayAvailability>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const retryOperation = async (operation: () => Promise<any>, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (err) {
        if (i === maxRetries - 1) throw err;
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [selectedDate, type]);

  const checkDayAvailability = async (date: Date) => {
    try {
      const { data, error } = await retryOperation(async () => {
        return await supabase
          .from(type === 'saltCave' ? 'salt_cave_reservations' : 'motel_reservations')
          .select('*')
          .eq('date', format(date, 'yyyy-MM-dd'));
      });

      if (error) {
        setError('Nie można sprawdzić dostępności. Spróbuj ponownie później.');
        return true;
      }

      if (type === 'saltCave') {
        // For salt cave, check if all time slots are taken
        const reservations = data as SaltCaveReservation[];
        const totalSlots = 11; // 10:00 to 20:00
        return reservations.length < totalSlots;
      }

      return true; // For motel, handle differently
    } catch (error) {
      console.error('Error checking day availability:', error);
      return true;
    }
  };
  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      if (type === 'saltCave') {
        const { data, error } = await retryOperation(async () => {
          return await supabase
            .from('salt_cave_reservations')
            .select('*')
            .eq('date', format(selectedDate, 'yyyy-MM-dd'));
        });

        if (error) {
          setError('Nie można pobrać rezerwacji. Spróbuj ponownie później.');
          return;
        }

        const slots = generateTimeSlots(data as SaltCaveReservation[]);
        setTimeSlots(slots);

        // Update availability for the current month
        const newDayAvailability: DayAvailability = {};
        const daysInMonth = getDaysInMonth(selectedDate);
        
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
          const isAvailable = await checkDayAvailability(date);
          newDayAvailability[format(date, 'yyyy-MM-dd')] = isAvailable;
        }
        
        setDayAvailability(newDayAvailability);
      } else {
        // For motel, check room availability
        const { data, error } = await retryOperation(async () => {
          return await supabase
            .from('motel_reservations')
            .select('*')
            .gte('check_in', format(selectedDate, 'yyyy-MM-dd'))
            .lte('check_out', format(selectedDate, 'yyyy-MM-dd'));
        });

        if (error) {
          setError('Nie można pobrać rezerwacji. Spróbuj ponownie później.');
          return;
        }

        // Update room availability based on existing reservations
        const reservations = data as MotelReservation[];
        // Handle room availability logic here
      }
      // For motel, we'll handle room availability differently
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = (reservations: SaltCaveReservation[]) => {
    const slots: TimeSlot[] = [];
    for (let hour = 10; hour <= 20; hour++) {
      const time = `${hour}:00`;
      const reservation = reservations.find(r => r.time === time);
      slots.push({
        time,
        isAvailable: !reservation,
        reservation
      });
    }
    return slots;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate.getDate();
      const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dateKey = format(currentDate, 'yyyy-MM-dd');
      const isAvailable = dayAvailability[dateKey] !== false;

      days.push(
        <motion.button
          key={day}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDateClick(day)}
          className={`h-12 w-12 mx-auto rounded-lg flex items-center justify-center text-base font-medium transition-colors ${
            isSelected
              ? 'bg-primary text-white'
              : !isAvailable
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
          }`}
        >
          {day}
        </motion.button>
      );
    }

    return days;
  };

  const handleReservationSubmit = () => {
    // Validate form
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      setError('Proszę wypełnić wszystkie pola formularza');
      return;
    }

    if (type === 'saltCave' && !selectedTime) {
      setError('Proszę wybrać godzinę seansu');
      return;
    }

    // Get selected ticket/room details
    const selectedOption = type === 'saltCave'
      ? SALT_CAVE_TICKET_TYPES.find(t => t.id === selectedTicketType)
      : ROOM_TYPES.find(r => r.id === selectedTicketType);

    if (!selectedOption) {
      setError('Nieprawidłowy typ biletu/pokoju');
      return;
    }

    setError(null);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmReservation = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(type === 'saltCave' ? 'salt_cave_reservations' : 'motel_reservations')
        .insert([
          {
            date: format(selectedDate, 'yyyy-MM-dd'),
            time: type === 'saltCave' ? selectedTime : null,
            ticket_type: selectedTicketType,
            number_of_people: customerDetails.numberOfPeople,
            customer_name: customerDetails.name,
            customer_email: customerDetails.email,
            customer_phone: customerDetails.phone,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      // Reset form
      setCustomerDetails({
        name: '',
        email: '',
        phone: '',
        numberOfPeople: 1
      });
      setSelectedTime('');
      setIsConfirmationModalOpen(false);
      
      // Refresh available slots
      fetchReservations();
      
      // Notify parent component
      onReservationSubmit(data);
    } catch (error) {
      console.error('Error creating reservation:', error);
      setError('Nie można utworzyć rezerwacji. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  };

  // Get current ticket/room price
  const getCurrentPrice = () => {
    const selectedOption = type === 'saltCave'
      ? SALT_CAVE_TICKET_TYPES.find(t => t.id === selectedTicketType)
      : ROOM_TYPES.find(r => r.id === selectedTicketType);
    return selectedOption?.price || 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 w-full">
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Calendar Column */}
        <div className="space-y-6 lg:col-span-1">
          <h3 className="text-xl font-medium text-gray-900 mb-6">Wybierz Datę</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'].map(day => (
              <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>

        {/* Time slots Column */}
        <div className="lg:col-span-1">
          {type === 'saltCave' ? (
            <>
              <h3 className="text-xl font-medium text-gray-900 mb-6">Dostępne Terminy</h3>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(slot => (
                  <motion.button
                    key={slot.time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.isAvailable}
                    className={`p-2 rounded-lg text-center ${
                      selectedTime === slot.time
                        ? 'bg-primary text-white'
                        : slot.isAvailable
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'bg-red-50 text-red-700 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium text-gray-900 mb-6">Dostępne Pokoje</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {ROOM_TYPES.map(room => (
                  <motion.button
                    key={room.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full p-4 rounded-lg bg-gray-50 hover:bg-gray-100 text-left"
                  >
                    <div className="flex justify-between items-center">
                      <span>{room.name}</span>
                      <span className="font-medium">{room.price} zł</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Customer Details Column */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-medium text-gray-900 mb-6">Dane Kontaktowe</h3>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={customerDetails.name}
              onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
              placeholder="Imię i nazwisko"
              className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
              placeholder="Email"
              className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              value={customerDetails.phone}
              onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
              placeholder="Numer telefonu"
              className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Liczba osób
            </label>
            <input
              type="number"
              min="1"
              value={customerDetails.numberOfPeople}
              onChange={(e) => setCustomerDetails({ ...customerDetails, numberOfPeople: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'saltCave' ? 'Rodzaj biletu' : 'Typ pokoju'}
            </label>
            <select
              value={selectedTicketType}
              onChange={(e) => setSelectedTicketType(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            >
              {type === 'saltCave' ? (
                <>
                  {SALT_CAVE_TICKET_TYPES.map(ticket => (
                    <option key={ticket.id} value={ticket.id}>
                      {ticket.name} - {ticket.price} zł
                    </option>
                  ))}
                </>
              ) : (
                <>
                  {ROOM_TYPES.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.name} - {room.price} zł
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <button
            type="button"
            onClick={handleReservationSubmit}
            disabled={loading || !!error}
            className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary-hover transition-colors mt-8 font-medium text-lg shadow-lg hover:shadow-xl"
          >
            {loading ? 'Ładowanie...' : 'Potwierdź Rezerwację'}
          </button>
        </div>
      </div>
      
      <ReservationConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmReservation}
        type={type}
        reservationDetails={{
          date: selectedDate,
          time: selectedTime,
          customerName: customerDetails.name,
          customerEmail: customerDetails.email,
          customerPhone: customerDetails.phone,
          numberOfPeople: customerDetails.numberOfPeople,
          ticketType: type === 'saltCave'
            ? SALT_CAVE_TICKET_TYPES.find(t => t.id === selectedTicketType)?.name || ''
            : ROOM_TYPES.find(r => r.id === selectedTicketType)?.name || '',
          price: getCurrentPrice()
        }}
      />
    </div>
  );
};

export default ReservationCalendar;