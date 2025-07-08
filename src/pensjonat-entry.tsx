import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MotelContainer from './containers/MotelContainer';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="relative">
        <Navbar />
        <MotelContainer />
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
);