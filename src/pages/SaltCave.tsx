import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Heart, ThermometerSun } from 'lucide-react';
import PhotoGrid from '../components/PhotoGrid';
import ReservationCalendar from '../components/ReservationCalendar';
import AnimatedBackground from '../components/AnimatedBackground';
import GrotaAlertModal from '../components/GrotaAlertModal';

const grotaImages = [
  '/images/Grota/2502276d.jpg',
  '/images/Grota/2984ad18.jpg',
  '/images/Grota/a0a98c5a.jpg',
  '/images/Grota/b5b988f5.jpg',
  '/images/Grota/dec30dbb.jpg',
  '/images/Grota/e6c67194.jpg'
];

const SaltCave = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-16">
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
          src="/images/logo_grota.png"
          alt="Grota Logo"
          className="w-16 h-16 object-contain filter drop-shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
        />
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <AnimatedBackground
        imageUrl="/images/Grota/bg.jpg"
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
                  src="/images/Grota/Grota_Solna__Gogols_Logo_Ci.jpg"
                  alt="Gogol.s Logo"
                  className="w-48 sm:w-64 md:w-80 mx-auto mb-4 sm:mb-6 rounded-2xl mix-blend-screen bg-black/10 backdrop-blur-sm"
                />
            </motion.div>
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4">Terapia w Grocie Solnej</h1>
            <p className="text-lg sm:text-xl font-light">Wykorzystaj naturalną, leczniczą moc soli.</p>
          </motion.div>
        </div>
      </AnimatedBackground>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Nasza Grota Solna</h2>
          <p className="text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Zachwyca niepowtarzalnym wyglądem i atmosferą, poprawi również stan zdrowia i samopoczucie osób w każdym wieku. 
            Nasza grota solna we Wrocławiu nie jest zwykłą atrakcją turystyczną - to miejsce, gdzie każdy uczestnik może 
            poczuć klimat spaceru przy samej plaży i samodzielnie odczuć zbawienny wpływ wdychania takich pierwiastków 
            chemicznych, jak jod, magnez czy wapń.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center justify-items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Grota Solna</h3>
              <p className="text-gray-600">
                Grota, nazywana również sauną lub jaskinią, to doskonałe miejsce dla osób pragnących odczuć korzyści, 
                jakie daje spacer nad samym brzegiem morza. Seanse w Grocie Solnej odpowiadają kilkudniowemu pobytowi 
                nad morzem. Panujący w niej mikroklimat podobny jest do tego, jaki oferują kopalnie soli czy morskie wybrzeża.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Sauna Fińska</h3>
              <p className="text-gray-600">
                Zaletą jest to, że wysoka temperatura otwiera pory skóry i oczyszcza ciało jak również przywraca 
                równowagę duchową, poprawia krążenie krwi, stabilizuje ciśnienie, a także wpływa na nasz układ nerwowy.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <p className="text-gray-600 mb-4">
              Już po 45 minutach wszyscy obecni poczują się zrelaksowani oraz zdrowsi. A wraz z kolejnymi seansami 
              stan umysłu i ciała będą się tylko poprawiać, zachęcamy więc do wielokrotnych odwiedzin.
            </p>
          </div>
          <h2 className="text-3xl font-bold text-center mb-8">Galeria zdjęć</h2>
          <PhotoGrid images={grotaImages} />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mb-12">Korzyści Zdrowotne</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              <BenefitCard
                icon={<Heart />}
                title="Układ Oddechowy"
                description="Poprawia oddychanie i schorzenia układu oddechowego"
              />
              <BenefitCard
                icon={<ThermometerSun />}
                title="Redukcja Stresu"
                description="Wspomaga relaks i redukuje stres"
              />
              <BenefitCard
                icon={<Clock />}
                title="Lepszy Sen"
                description="Poprawia jakość snu"
              />
              <BenefitCard
                icon={<Users />}
                title="Zdrowa Skóra"
                description="Poprawia różne dolegliwości skórne"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mb-2">Cennik</h2>
            <p className="text-red-500 font-semibold text-center mb-12">DZIECI PONIŻEJ 3 LAT – SEANS BEZPŁATNY!*</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 w-full mb-8">
              <SessionCard
                title="Bilet Normalny"
                onClick={() => setIsModalOpen(true)}
                duration={45}
                price={21}
                features={[
                  "Dla osób dorosłych",
                  "Seans 45 minut",
                  "Pełen dostęp do groty"
                ]}
              />
              <SessionCard
                title="Bilet Ulgowy"
                onClick={() => setIsModalOpen(true)}
                duration={45}
                price={17}
                features={[
                  "Uczniowie",
                  "Studenci",
                  "Emeryci i renciści"
                ]}
              />
              <SessionCard
                title="Karnet Normalny"
                onClick={() => setIsModalOpen(true)}
                duration={45}
                price={180}
                features={[
                  "10 wejść",
                  "Ważny 2 miesiące",
                  "Oszczędność 30 zł"
                ]}
              />
              <SessionCard
                title="Karnet Ulgowy"
                onClick={() => setIsModalOpen(true)}
                duration={45}
                price={140}
                features={[
                  "10 wejść",
                  "Ważny 2 miesiące",
                  "Oszczędność 30 zł"
                ]}
              />
            </div>
            
            <h3 className="text-2xl font-bold text-center mb-8">Karnety Rodzinne</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 w-full mb-8">
              <SessionCard
                title="Karnet 1+1"
                onClick={() => setIsModalOpen(true)}
                duration={45}
                price={288}
                features={[
                  "10 wejść",
                  "1 dorosły + 1 dziecko",
                  "Ważny 2 miesiące"
                ]}
              />
              <SessionCard
                title="Karnet 2+1"
                onClick={() => setIsModalOpen(true)}
                duration={45}
                price={450}
                features={[
                  "10 wejść",
                  "2 dorosłych + 1 dziecko",
                  "Ważny 2 miesiące"
                ]}
              />
              <SessionCard
                title="Karnet 2+2"
                onClick={() => setIsModalOpen(true)}
                duration={45}
                price={576}
                features={[
                  "10 wejść",
                  "2 dorosłych + 2 dzieci",
                  "Ważny 2 miesiące"
                ]}
              />
            </div>
            
            <div 
              className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setIsModalOpen(true)}
            >
              <h3 className="text-xl font-semibold mb-4 text-primary text-center">Wynajem Prywatny</h3>
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">180 zł / seans</p>
                <div className="space-y-1 text-gray-600">
                  <p>Wynajęcie całej jaskini na 1 seans</p>
                  <p className="text-sm">Maksymalnie 10 osób (wliczając dzieci)</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-gray-500 max-w-2xl text-center">
              <p>* Bezpłatny wstęp dla dzieci poniżej 3 lat nie dotyczy grup zorganizowanych</p>
              <p className="mt-2">Wszystkie karnety na 10 wejść są ważne przez 2 miesiące od daty zakupu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <GrotaAlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-lg shadow-lg text-center mx-auto w-full max-w-sm"
  >
    <div className="text-primary mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const SessionCard = ({ title, duration, price, features, onClick }: { 
  title: string; 
  onClick: () => void;
  duration: number; 
  price: number; 
  features: string[] 
}) => (
  <motion.div
    whileHover={{ y: -10 }}
    onClick={onClick}
    className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto w-full"
    style={{ cursor: 'pointer' }}
  >
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-1 text-center">{title}</h3>
      <p className="text-sm text-gray-600 mb-2 text-center">{duration} minut</p>
      <p className="text-2xl font-bold text-primary mb-3 text-center">{price} zł</p>
      <ul className="space-y-1 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default SaltCave;