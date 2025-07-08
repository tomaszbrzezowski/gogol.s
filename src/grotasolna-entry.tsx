import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import SaltCaveContainer from './containers/SaltCaveContainer';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="relative">
        <Navbar />
        <SaltCaveContainer />
        <Chatbot />
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
)