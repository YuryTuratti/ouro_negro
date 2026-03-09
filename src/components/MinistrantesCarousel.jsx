import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MinistrantesCarousel.css';

/**
 * Componente ParticipantesCarousel
 * Carrossel automático que passa por Ministrantes, Musicalidade e Presenças
 */
const ParticipantesCarousel = () => {
  // 1. Unificamos a lista e adicionamos a 'categoria'
  const participantes = [
    // --- MINISTRANTES ---
    { id: 1, categoria: 'MINISTRANTES', nome: 'Mestra Luciana', imagem: '/mestra luciana.jpeg' },
    { id: 2, categoria: 'MINISTRANTES', nome: 'Mestranda Sinhá', imagem: '/mestranda sinhá.jpeg' },
    { id: 3, categoria: 'MINISTRANTES', nome: 'Contramestra Rose', imagem: '/contramestra rose.jpeg' },
    { id: 4, categoria: 'MINISTRANTES', nome: 'Professora Dandara', imagem: '/professora dandara.jpeg' },
    { id: 5, categoria: 'MINISTRANTES', nome: 'Monitora Anhuma', imagem: '/monitora_anhuma.jpeg' },
    { id: 6, categoria: 'MINISTRANTES', nome: 'Instrutora Navalha', imagem: '/instrutora navalha.jpeg' },
    { id: 7, categoria: 'MUSICALIDADE', nome: 'Professora Presença', imagem: '/musicalidade_presença.jpeg' },
    { id: 8, categoria: 'MUSICALIDADE', nome: 'Professora Pantera', imagem: '/musicalidade_pantera.jpeg' },
    { id: 9, categoria: 'PRESENÇAS ESPECIAIS', nome: 'Professora Lu', imagem: '/especial_lu.jpeg' },
    { id: 10, categoria: 'PRESENÇAS ESPECIAIS', nome: 'Professora Corujinha', imagem: '/especial_corujinha.jpeg' },
    { id: 11, categoria: 'PRESENÇAS ESPECIAIS', nome: 'Estagiária Felina', imagem: '/especial_felina.jpeg' },


  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Timer para troca automática a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === participantes.length - 1 ? 0 : prevIndex + 1
      );
    }, 2700);

    return () => clearInterval(timer);
  }, [participantes.length]);

  const currentPerson = participantes[currentIndex];

  // Variantes de animação para fade suave do card
  const fadeVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="ministrantes-carousel">
      
      {/* 2. Título Dinâmico com Animação */}
      <AnimatePresence mode="wait">
        <motion.h3 
          key={currentPerson.categoria} // Isso faz o título animar apenas quando a categoria muda!
          className="ministrantes-carousel__title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {currentPerson.categoria}
        </motion.h3>
      </AnimatePresence>

      {/* Container do Carrossel */}
      <div className="ministrantes-carousel__container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPerson.id}
            className="ministrantes-carousel__slide"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Foto */}
            <div className="ministrantes-carousel__image-wrapper">
              <img
                src={currentPerson.imagem}
                alt={currentPerson.nome}
                className="ministrantes-carousel__image"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231a1a1a" width="400" height="400"/%3E%3Ctext fill="%23d4af37" font-family="Montserrat,sans-serif" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EFoto em Breve%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Nome */}
            <motion.p 
              className="ministrantes-carousel__name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {currentPerson.nome}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores de navegação (bolinhas) */}
      <div className="ministrantes-carousel__indicators">
        {participantes.map((_, index) => (
          <button
            key={index}
            className={`ministrantes-carousel__indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para participante ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipantesCarousel;