import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Heart, ThermometerSun, Shield, Wind, Brain, Sparkles, Droplets, ChevronDown, ChevronUp } from 'lucide-react';
import PhotoGrid from '../components/PhotoGrid';
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
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);
  const [showGrotaInfo, setShowGrotaInfo] = useState(false);
  const [showSaunaInfo, setShowSaunaInfo] = useState(false);

  const benefits = [
    {
      id: 'immunity',
      icon: <Shield className="w-8 h-8" />,
      title: 'Wzmacnia odporność',
      description: 'Minerały w solance, takie jak jod, magnez i wapń, wzmacniają naturalną odporność organizmu, pomagając w walce z infekcjami i chorobami.'
    },
    {
      id: 'breathing',
      icon: <Wind className="w-8 h-8" />,
      title: 'Poprawia oddychanie',
      description: 'Wdychanie solanki pomaga oczyścić drogi oddechowe, łagodzi objawy astmy, alergii i innych schorzeń układu oddechowego.'
    },
    {
      id: 'stress',
      icon: <Brain className="w-8 h-8" />,
      title: 'Działa antystresowo i wyciszająco',
      description: 'Spokojna atmosfera i naturalne właściwości soli pomagają zredukować stres, napięcie i poprawić jakość snu.'
    },
    {
      id: 'skin',
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Wspiera terapię schorzeń skórnych',
      description: 'Sól morska pomaga w leczeniu egzemy, łuszczycy, trądziku i innych problemów skórnych dzięki swoim właściwościom antybakteryjnym.'
    },
    {
      id: 'minerals',
      icon: <Droplets className="w-8 h-8" />,
      title: 'Dostarcza cennych mikroelementów',
      description: 'Naturalne minerały wchłaniane przez skórę i drogi oddechowe dostarczają organizmowi cennych pierwiastków potrzebnych do prawidłowego funkcjonowania.'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Floating Logo */}
      <div className="fixed bottom-8 left-8 z-50">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-gray-800/60 rounded-full blur-xl animate-pulse" />
          <div className="absolute inset-0 bg-gray-900/70 rounded-full backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.img
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src="/images/logo_grota.png"
              alt="Grota Logo"
              className="w-16 h-16 object-contain filter drop-shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <AnimatedBackground imageUrl="/images/Grota/bg.jpg">
        <div className="relative h-full flex items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-[90vw] px-4 sm:px-8 md:px-16 py-10 sm:py-16 md:py-20 bg-black/20 backdrop-blur-sm rounded-xl border border-amber-400/30 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-block"
            >
              <img
                src="/images/Grota/Grota_Solna__Gogols_Logo_Ci.jpg"
                alt="Gogol.s Logo"
                className="w-48 sm:w-64 md:w-80 mx-auto mb-4 sm:mb-6 rounded-2xl mix-blend-screen bg-black/10 backdrop-blur-sm"
              />
            </motion.div>
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4 text-white">Grota Solna & Sauna</h1>
            <h2 className="hero-title text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-amber-100">Gogol•S</h2>
            <p className="text-lg sm:text-xl font-light text-white mb-4">Naturalny relaks, który regeneruje ciało i umysł.</p>
            <p className="text-base sm:text-lg text-gray-200">Odkryj moc soli i prywatnej sauny fińskiej.</p>
          </motion.div>
        </div>
      </AnimatedBackground>

      {/* Nasza Oferta Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Nasza oferta</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Grota Solna */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Droplets className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Grota solna</h3>
              <button
                onClick={() => setShowGrotaInfo(!showGrotaInfo)}
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-all duration-300 font-semibold shadow-lg"
              >
                Dowiedz się więcej
              </button>
              
              {showGrotaInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="mt-6 p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm border border-gray-600/30"
                >
                  <p className="text-gray-200 text-left leading-relaxed">
                    Grota, nazywana również sauną lub jaskinią, to doskonałe miejsce dla osób pragnących odczuć korzyści, 
                    jakie daje spacer nad samym brzegiem morza. Seanse w Grocie Solnej odpowiadają kilkudniowemu pobytowi 
                    nad morzem. Panujący w niej mikroklimat podobny jest do tego, jaki oferują kopalnie soli czy morskie wybrzeża.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Sauna Fińska */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <ThermometerSun className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Prywatna sauna</h3>
              <h4 className="text-lg mb-4 text-gray-300">fińska</h4>
              <p className="text-sm text-gray-400 mb-4">(max 3 osoby)</p>
              <button
                onClick={() => setShowSaunaInfo(!showSaunaInfo)}
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-all duration-300 font-semibold shadow-lg"
              >
                Dowiedz się więcej
              </button>
              
              {showSaunaInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="mt-6 p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm border border-gray-600/30"
                >
                  <p className="text-gray-200 text-left leading-relaxed">
                    Zaletą sauny fińskiej jest to, że wysoka temperatura otwiera pory skóry i oczyszcza ciało jak również przywraca 
                    równowagę duchową, poprawia krążenie krwi, stabilizuje ciśnienie, a także wpływa na nasz układ nerwowy. 
                    Nasza sauna jest prywatna i może pomieścić maksymalnie 3 osoby.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dlaczego warto? Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Dlaczego warto?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Lewa kolumna */}
            <div className="space-y-6">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-4 text-white"
              >
                <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-semibold">Poprawa odporności</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-4 text-white"
              >
                <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <ThermometerSun className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-semibold">Lepszy sen</span>
              </motion.div>
            </div>
            
            {/* Prawa kolumna */}
            <div className="space-y-6">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-4 text-white"
              >
                <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-semibold">Redukcja stresu</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-4 text-white"
              >
                <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-semibold">Ulga w problemach oddechowych</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* GROTA SOLNA - Expandable Benefits */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">GROTA SOLNA</h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                className="bg-gray-700/30 rounded-lg overflow-hidden border border-gray-600/30 backdrop-blur-sm"
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setExpandedBenefit(expandedBenefit === benefit.id ? null : benefit.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-amber-400">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  </div>
                  <motion.div 
                    className="text-gray-300"
                    animate={{ rotate: expandedBenefit === benefit.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown />
                  </motion.div>
                </button>
                
                {expandedBenefit === benefit.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-300 leading-relaxed pl-12">
                      {benefit.description}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Galeria</h2>
          <PhotoGrid images={grotaImages} />
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Zarezerwuj wizytę
          </motion.button>
        </div>
      </section>

      <GrotaAlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SaltCave;