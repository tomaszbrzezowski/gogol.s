import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface QA {
  question: string;
  answer: string;
}

const qaDatabase: QA[] = [
  {
    question: "Jakie są korzyści z korzystania z groty solnej?",
    answer: "Grota solna & sauna oferuje wiele korzyści zdrowotnych:\n\n• Wzmocnienie odporności poprzez minerały jak jod i magnez\n• Poprawa kondycji skóry dzięki właściwościom antyseptycznym\n• Redukcja stresu i napięcia\n• Wspomaganie leczenia chorób układu oddechowego\n• Poprawa krążenia krwi\n• Leczenie alergii i problemów skórnych\n\nRegularne sesje w grocie solnej & saunie mogą znacząco poprawić Twoje zdrowie i samopoczucie."
  },
  {
    question: "Jak się ubrać do groty solnej?",
    answer: "Do groty solnej zalecamy:\n\n• Wygodne, przewiewne ubrania z naturalnych tkanin\n• Białe skarpetki (wymagane ze względów higienicznych)\n\nPrzed wizytą warto:\n• Wziąć prysznic\n• Unikać intensywnych kosmetyków"
  },
  {
    question: "Jak długo trwa seans w grocie solnej & saunie?",
    answer: "Standardowy seans w grocie solnej & saunie trwa około 45 minut. To optymalny czas, który pozwala w pełni skorzystać z dobroczynnych właściwości mikroklimatu bogatego w minerały. Już jedna sesja może przynieść uczucie odprężenia i poprawę samopoczucia."
  },
  {
    question: "Jakie są przeciwwskazania do korzystania z groty solnej?",
    answer: "Osoby z przewlekłymi chorobami serca, nadciśnieniem, problemami oddechowymi czy alergiami wziewnymi powinny skonsultować się z lekarzem przed wizytą w grocie solnej."
  },
  {
    question: "Kto może korzystać z groty solnej & sauny?",
    answer: "Grota solna & sauna jest bezpieczna dla większości osób. Szczególnie polecamy ją osobom cierpiącym na problemy z układem oddechowym, alergikom, osobom z problemami skórnymi oraz tym, którzy chcą się zrelaksować i poprawić odporność. Jednak przed wizytą zalecamy skonsultować się z lekarzem przed wizytą w grocie solnej & saunie."
  },
  {
    question: "Ile kosztuje seans w grocie solnej & saunie?",
    answer: "Oferujemy różne opcje cenowe:\n• Bilet normalny (45 min) - 21 zł\n• Bilet ulgowy (45 min) - 17 zł\n• Karnet normalny (10 wejść) - 180 zł\n• Karnet ulgowy (10 wejść) - 140 zł\n• Wynajem prywatny (45 min, do 10 osób) - 180 zł\n\nDzieci poniżej 3 lat mają wstęp bezpłatny!"
  },
  {
    question: "Czy przed wizytą w grocie solnej & saunie trzeba się specjalnie przygotować?",
    answer: "Przygotowanie jest bardzo proste! Po prostu przyjdź w wygodnym ubraniu. Zalecamy lekkie, przewiewne ubrania. Nie trzeba zabierać ręczników ani innych akcesoriów - wszystko zapewniamy na miejscu."
  },
  {
    question: "Czy w grocie solnej & saunie jest zimno?",
    answer: "W grocie solnej & saunie panuje przyjemna temperatura 18-24°C, idealna do relaksu. Zapewniamy lekkie koce dla osób wrażliwych na temperaturę, aby zagwarantować pełen komfort podczas seansu."
  },
  {
    question: "Czy grota solna & sauna jest bezpieczna dla kobiet w ciąży?",
    answer: "Grota solna & sauna może przynieść wiele korzyści w czasie ciąży, jak wzmocnienie odporności i redukcja obrzęków. Jednak zalecamy konsultację z lekarzem prowadzącym, szczególnie w przypadku ciąży zagrożonej lub problemów zdrowotnych."
  },
  {
    question: "Czy grota solna & sauna pomaga na problemy skórne?",
    answer: "Tak! Grota solna & sauna może pomóc przy problemach skórnych:\n\n• Łagodzi trądzik i egzemę\n• Wspomaga leczenie łuszczycy\n• Oczyszcza i ujędrnia skórę\n• Spowalnia procesy starzenia\n\nRegularne seanse mogą znacząco poprawić kondycję skóry."
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Witaj! W czym mogę pomóc?", isUser: false },
    { text: "Wybierz pytanie z poniższej listy:", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleQuestionClick = (question: string) => {
    setInput(question);
    // Automatically submit the question after selecting it
    const userQuestion = question.toLowerCase();
    setMessages([...messages, { text: question, isUser: true }]);
    
    // Find matching question and answer
    const matchingQA = qaDatabase.find(qa => 
      qa.question.toLowerCase().includes(userQuestion) || 
      userQuestion.includes(qa.question.toLowerCase().split('?')[0])
    );

    setTimeout(() => {
      if (matchingQA) {
        setMessages(prev => [...prev, {
          text: matchingQA.answer + "\n\nWybierz kolejne pytanie z listy:",
          isUser: false
        }]);
      } else {
        setMessages(prev => [...prev, {
          text: "Przepraszam, nie znalazłem odpowiedzi na to pytanie. Wybierz pytanie z listy poniżej:",
          isUser: false
        }]);
      }
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");
    
    // Find matching question and answer
    const userQuestion = input.toLowerCase();
    const matchingQA = qaDatabase.find(qa => 
      qa.question.toLowerCase().includes(userQuestion) || 
      userQuestion.includes(qa.question.toLowerCase().split('?')[0])
    );

    setTimeout(() => {
      if (matchingQA) {
        setMessages(prev => [...prev, {
          text: matchingQA.answer + "\n\nWybierz kolejne pytanie z listy:",
          isUser: false
        }]);
      } else {
        setMessages(prev => [...prev, {
          text: "Przepraszam, nie znalazłem odpowiedzi na to pytanie. Wybierz pytanie z listy poniżej:",
          isUser: false
        }]);
      }
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover transition-colors z-40 font-serif"
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl z-50"
          >
            <div className="p-4 bg-primary text-white rounded-t-lg flex justify-between items-center font-serif">
              <h3 className="font-medium">Czat z nami</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg cursor-pointer ${
                      message.isUser
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <span className="flex-1 font-serif">{message.text}</span>
                  </div>
                </div>
              ))}
              {!messages[messages.length - 1]?.isUser && (
                <div className="space-y-2 mt-4">
                  {qaDatabase.map((qa, index) => (
                    <div
                      key={index}
                      onClick={() => handleQuestionClick(qa.question)}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors flex items-center space-x-2"
                    >
                      <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="flex-1">{qa.question}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Napisz lub wybierz pytanie..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSend}
                  className="bg-primary text-white p-2 rounded-lg hover:bg-primary-hover transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;