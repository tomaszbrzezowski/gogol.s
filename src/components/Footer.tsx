import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Footer = () => {
  const grotaPosition: [number, number] = [51.15592472019204, 17.044712531458924];
  const pensjonatPosition: [number, number] = [51.15243241807218, 17.039718814399638];
  const mapCenter: [number, number] = [51.15417856913211, 17.042215672929281];

  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <footer className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Kontakt</h3>
            <div className="space-y-4">
              <a href="mailto:gogol.s@wp.pl" className="flex items-center group hover:text-primary transition-colors">
                <Mail size={20} className="mr-2 group-hover:text-primary transition-colors" />
                gogol.s@wp.pl
              </a>
              <div className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <div className="mb-6">
                    <p className="font-serif font-semibold text-red-500 mb-1">GROTA SOLNA</p>
                    <p>ul. Kamieńskiego 221/U1</p>
                    <p>51-126 Wrocław</p>
                    <a href="tel:+48533541114" className="flex items-center group hover:text-primary transition-colors mt-2">
                      <Phone size={16} className="mr-2 group-hover:text-primary transition-colors" />
                      +48 533 541 114
                    </a>
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-blue-500 mb-1">PENSJONAT GOGOL'S</p>
                    <p>ul. Milicka 60</p>
                    <p>51-126 Wrocław</p>
                    <a href="tel:+48606412706" className="flex items-center group hover:text-primary transition-colors mt-2">
                      <Phone size={16} className="mr-2 group-hover:text-primary transition-colors" />
                      +48 606 412 706
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Godziny Otwarcia</h3>
            <div className="space-y-2">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="font-serif font-semibold mb-2">Doba hotelowa:</p>
                <p>Zameldowanie: 14:00</p>
                <p>Wymeldowanie: 11:00</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="font-serif font-semibold mb-2">Grota Solna:</p>
                <p>Poniedziałek - Piątek: 10:00 – 21:00</p>
                <p>Sobota – Niedziela: 11:00 – 20:00</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg mt-4">
                <p className="font-serif font-semibold mb-2">Seanse z dziećmi:</p>
                <p>Poniedziałek – Piątek:</p>
                <p>12:00, 14:00, 16:00, 18:00</p>
                <p className="mt-2">Sobota – Niedziela:</p>
                <p>12:00, 14:00, 16:00, 18:00</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Lokalizacja</h3>
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <MapContainer
                center={mapCenter}
                zoom={13}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={grotaPosition} icon={customIcon}>
                  <Popup>
                    <div className="font-serif">
                      <p className="font-semibold text-red-500">GROTA SOLNA</p>
                      <p>ul. Kamieńskiego 221/U1</p>
                      <p>51-126 Wrocław</p>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={pensjonatPosition} icon={customIcon}>
                  <Popup>
                    <div className="font-serif">
                      <p className="font-semibold text-blue-500">PENSJONAT GOGOL'S</p>
                      <p>ul. Milicka 60</p>
                      <p>51-126 Wrocław</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                onClick={() => window.open('https://maps.google.com/?q=ul.+Kamieńskiego+221/U1,+Wrocław')}
              >
                <div className="w-3 h-3 bg-red-500 rounded-full group-hover:animate-pulse"></div>
                <span className="group-hover:text-white">Grota Solna - ul. Kamieńskiego 221/U1</span>
              </div>
              <div 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                onClick={() => window.open('https://maps.google.com/?q=ul.+Milicka+60,+Wrocław')}
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:animate-pulse"></div>
                <span className="group-hover:text-white">Pensjonat - ul. Milicka 60</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Obserwuj Nas</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="hover:text-primary transition-colors p-2 bg-gray-800/50 rounded-lg"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="#" 
                className="hover:text-primary transition-colors p-2 bg-gray-800/50 rounded-lg"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Gogol.s - Pensjonat i Grota Solna. Wszelkie prawa zastrzeżone.{' '}
            <a href="/admin.html" className="text-primary hover:text-primary-hover transition-colors">
              Panel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;