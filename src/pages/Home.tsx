import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Bed, Flower2, Clock, MapPin } from 'lucide-react';
import CombinedContactModal from '../components/CombinedContactModal';

const Home = () => {
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-screen"
        style={{
          backgroundImage: `url("/images/bg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          filter: 'contrast(1.1) brightness(1.1)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[90vw] px-4 sm:px-8 md:px-16 py-10 sm:py-16 md:py-20"
          >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-8 relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex justify-center"
              onClick={() => navigate('/grotasolna')}
              style={{ cursor: 'pointer' }}>
              <img
                src="/images/Grota/Grota_Solna__Gogols_Logo_Ci.jpg"
                alt="Grota Solna Logo"
                className="w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain rounded-2xl"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex justify-center"
              onClick={() => navigate('/pensjonat')}
               style={{ cursor: 'pointer' }}>
               <img
                 src="/images/Grota/Pensjonat__Gogols_Logo__Cie.jpg"
                 alt="Pensjonat Logo"
                 className="w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain rounded-2xl"
               />
             </motion.div>
           </div>
           
           <p className="text-2xl sm:text-3xl font-light italic text-white/90 mb-8">
             "Przyjedź do nas i zrelaksuj się..."
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/grotasolna"
                className="bg-red-500 text-white w-full sm:w-64 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-serif font-medium rounded-lg hover:bg-red-600 transition-all duration-500 ease-in-out shadow-md hover:shadow-2xl hover:shadow-red-500/50 transform hover:-translate-y-1 flex items-center justify-center"
              >
                Sesje w Grocie
              </Link>
              <Link
                to="/pensjonat"
                className="bg-blue-300 text-gray-700 w-full sm:w-64 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-serif font-medium rounded-lg hover:bg-blue-400 transition-all duration-500 ease-in-out shadow-md hover:shadow-2xl hover:shadow-blue-300/50 transform hover:-translate-y-1 flex items-center justify-center"
              >
                Rezerwuj Pokój
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              <FeatureCard
                icon={<Bed />}
                title="Komfortowe Pokoje"
                description="Nowoczesne udogodnienia z nutą luksusu"
              />
              <FeatureCard
                icon={<Flower2 />}
                title="Terapia w Grocie Solnej"
                description="Naturalne uzdrawianie w naszej grocie solnej"
              />
              <FeatureCard
                icon={<Clock />}
                title="Elastyczne Godziny"
                description="Otwarte codziennie z wydłużonymi godzinami w weekendy"
              />
              <FeatureCard
                icon={<MapPin />}
                title="Świetna Lokalizacja"
                description="Łatwy dostęp do lokalnych atrakcji"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      <CombinedContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="text-gray-600 font-light">{description}</p>
  </div>
);

export default Home;