import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MinistrantesCarousel.css';

/**
 * Componente MinistrantesCarousel
 * Carrossel automático com fotos e nomes das ministrantes
 * Troca a cada 4 segundos com animação de fade
 */
const MinistrantesCarousel = () => {
  // Array de ministrantes (ordem hierárquica de graduação)
  const ministrantes = [
    {
      id: 1,
      nome: 'Mestra Luciana',
      imagem: '/mestra luciana.jpeg'
    },
    {
      id: 2,
      nome: 'Contramestra Rose',
      imagem: '/contratamestra rose.jpeg'
    },
    {
      id: 3,
      nome: 'Mestranda Sinhá',
      imagem: '/mestranda sinhá.jpeg'
    },
    {
      id: 4,
      nome: 'Professora Dandara',
      imagem: '/professora dandara.jpeg'
    },
    {
      id: 5,
      nome: 'Instrutora Navalha',
      imagem: '/instrutora navalha.jpeg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Timer para troca automática a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === ministrantes.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [ministrantes.length]);

  const currentMinistrante = ministrantes[currentIndex];

  // Variantes de animação para fade suave
  const fadeVariants = {
    initial: { 
      opacity: 0,
      scale: 0.95
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="ministrantes-carousel">
      {/* Título "MINISTRANTES" */}
      <motion.h3 
        className="ministrantes-carousel__title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        MINISTRANTES
      </motion.h3>

      {/* Container do Carrossel */}
      <div className="ministrantes-carousel__container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMinistrante.id}
            className="ministrantes-carousel__slide"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Foto da Ministrante */}
            <div className="ministrantes-carousel__image-wrapper">
              <img
                src={currentMinistrante.imagem}
                alt={currentMinistrante.nome}
                className="ministrantes-carousel__image"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231a1a1a" width="400" height="400"/%3E%3Ctext fill="%23d4af37" font-family="Montserrat,sans-serif" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EFoto em Breve%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Nome da Ministrante */}
            <motion.p 
              className="ministrantes-carousel__name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {currentMinistrante.nome}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores de navegação */}
      <div className="ministrantes-carousel__indicators">
        {ministrantes.map((_, index) => (
          <button
            key={index}
            className={`ministrantes-carousel__indicator ${
              index === currentIndex ? 'active' : ''
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para ministrante ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MinistrantesCarousel;
