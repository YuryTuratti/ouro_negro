import React, { useRef, useState } from 'react';
import HeroSection from './components/HeroSection';
import EventHeader from './components/EventHeader';
import MinimalTimeline from './components/MinimalTimeline';
import CardsSection from './components/CardsSection';
import InvestmentSection from './components/InvestmentSection';
import FormSection from './components/FormSection';
import Modal from './components/Modal';
import Footer from './components/Footer';
import './App.css';

function App() {
  const formRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <HeroSection />
      <EventHeader onCTAClick={handleOpenModal} />
      <CardsSection />
      <MinimalTimeline />
      
      {/* 🟢 PASSAMOS A FUNÇÃO PARA CÁ TAMBÉM */}
      <InvestmentSection onOpenModal={handleOpenModal} />
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormSection formRef={formRef} />
      </Modal>

      <Footer />
    </div>
  );
}

export default App;