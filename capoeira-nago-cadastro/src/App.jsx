import React, { useRef, useState } from 'react';
import HeroSection from './components/HeroSection';
import EventHeader from './components/EventHeader';
import CardsSection from './components/CardsSection';
import InvestmentSection from './components/InvestmentSection';
import FormSection from './components/FormSection';
import Modal from './components/Modal';
import './App.css';

/**
 * Componente principal da aplicação
 * Página de cadastro do evento CAPOEIRA NAGO
 */
function App() {
  const formRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Abre o modal do formulário
   */
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Fecha o modal do formulário
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <HeroSection />
      <EventHeader />
      <CardsSection />
      <InvestmentSection />
      
      {/* Modal com o formulário */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormSection formRef={formRef} />
      </Modal>
    </div>
  );
}

export default App;
