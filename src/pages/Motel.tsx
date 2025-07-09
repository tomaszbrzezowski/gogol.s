import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Coffee, Tv, Bath } from 'lucide-react';
import PhotoGrid from '../components/PhotoGrid';
import AnimatedBackground from '../components/AnimatedBackground';
import ReservationCalendar from '../components/ReservationCalendar';
import RoomAlertModal from '../components/RoomAlertModal';

const motelImages = [
  '/images/Pensjonat/081C6CCF-475E-4BFC-AA50-99148FCA34C3-1.jpg',
  '/images/Pensjonat/0A59904D-D024-4A99-A268-66ECA30AEBC4.jpg',
  '/images/Pensjonat/0E887C4C-C1DB-449B-9C99-9D150A9716D8-2.jpg',
  '/images/Pensjonat/1514D3BB-FC06-4B35-A929-FD4F9C865DBC-2.jpg',
  '/images/Pensjonat/2EE8AA42-B25A-4D59-BF45-5152A8547F8E-3.jpg',
  '/images/Pensjonat/3239FAF3-1CEB-4281-8131-4DC0D9879A2D-3.jpg',
  '/images/Pensjonat/37BA3B15-1A7D-41DE-855F-D7854D6EB568-2.jpg',
  '/images/Pensjonat/740D6B20-E716-47B8-9A22-9F157DF3BD53-2.jpg',
  '/images/Pensjonat/9553E1C5-65D1-4697-9B35-B181C7711591-2.jpeg',
  '/images/Pensjonat/CF867BEB-BC5A-423B-885E-5BEDB8B9C365-2.jpg'
];
const Motel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Floating Logo */}
      <div className="fixed bottom-8 left-8 z-50">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-gray-800/60 rounded-full blur-xl animate-pulse" />
          <div className="absolute inset-0 bg-gray-900/70 rounded-full backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src="/images/logo_pensjonat.png"
          alt="Pensjonat Logo"
          className="w-16 h-16 object-contain filter drop-shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
        />
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <AnimatedBackground
        imageUrl="/images/Pensjonat/xdp-bg_foto_1.jpg"
      >
        <div className="relative h-full flex items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[90vw] px-4 sm:px-8 md:px-16 py-10 sm:py-16 md:py-20 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-400/30 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block">
                <img
                  src="/images/Grota/Pensjonat__Gogols_Logo__Cie.jpg"
                  alt="Gogol.s Logo"
                  className="w-48 sm:w-64 md:w-80 mx-auto mb-4 sm:mb-6 rounded-2xl mix-blend-screen bg-black/10 backdrop-blur-sm"
                />
            </motion.div>
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4">Luksusowe Zakwaterowanie</h1>
            <p className="text-lg sm:text-xl font-light">Twój komfortowy pobyt we Wrocławiu</p>
          </motion.div>
        </div>
      </AnimatedBackground>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl shadow-lg p-8 sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center font-serif">
                <h2 className="section-title text-gray-800">Witamy w Pensjonacie Gogol's</h2>
                <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <p className="text-lg leading-relaxed text-gray-700">
                    Zapraszamy wszystkich państwa, którzy potrzebujecie wypoczynku po męczącej podróży,
                    lub wytchnienia po zwiedzeniu pięknych zakątków naszego miasta i okolic.
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <p className="text-lg leading-relaxed text-gray-700">
                    Pensjonat znajduje się w cichej i bezpiecznej dzielnicy Wrocławia – Psie Pole.
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <p className="text-lg leading-relaxed text-gray-700">
                    Znakomity zarówno dla rodzin z dziećmi, turystów, jak też dla pracowników firm
                    oddelegowanych do pracy we Wrocławiu.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mb-4">Nasze Pokoje</h2>
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-2">Doba hotelowa: 14:00 - 11:00</p>
              <p className="text-gray-700 font-medium">Łącznie 10 pokoi:</p>
              <ul className="text-gray-600 mt-2 space-y-1">
                <li>Pokój dwuosobowy ze wspólną łazienką - 4 szt.</li>
                <li>Pokój dwuosobowy z łazienką - 4 szt.</li>
                <li>Pokój trzyosobowy z łazienką - 1 szt.</li>
                <li>Pokój czteroosobowy z łazienką - 1 szt.</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
              <RoomCard
                title="Pokój dwuosobowy"
                description="ze wspólną łazienką"
                image={motelImages[0]}
                onClick={() => setIsModalOpen(true)}
              />
              <RoomCard
                title="Pokój dwuosobowy"
                description="z łazienką"
                image={motelImages[1]}
                onClick={() => setIsModalOpen(true)}
              />
              <RoomCard
                title="Pokój trzyosobowy"
                description="z łazienką"
                image={motelImages[2]}
                onClick={() => setIsModalOpen(true)}
              />
              <RoomCard
                title="Pokój czteroosobowy"
                description="z łazienką"
                image={motelImages[3]}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mb-12">Udogodnienia</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            <AmenityCard icon={<Wifi />} title="Darmowe Wi-Fi" />
            <AmenityCard icon={<Coffee />} title="Ekspres do Kawy" />
            <AmenityCard icon={<Tv />} title="Smart TV" />
            <AmenityCard icon={<Bath />} title="Prywatna Łazienka" />
          </div>
        </div>
        </div>
      </section>

      {/* Booking Section */}
      <RoomAlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const RoomCard = ({ 
  title, 
  description, 
  image,
  onClick
}: { 
  title: string; 
  description: string;
  image: string;
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-lg shadow-lg overflow-hidden"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">{description}</p>
      <div className="text-primary text-sm font-medium">Kliknij, aby zarezerwować</div>
    </div>
  </motion.div>
);

const AmenityCard = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex flex-col items-center text-center px-2">
    <div className="text-secondary mb-2">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
  </div>
);

export default Motel;