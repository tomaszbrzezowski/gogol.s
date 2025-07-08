import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeContainer from './containers/HomeContainer';
import MotelContainer from './containers/MotelContainer';
import SaltCaveContainer from './containers/SaltCaveContainer';
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/pensjonat" element={<MotelContainer />} />
          <Route path="/grotasolna" element={<SaltCaveContainer />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;