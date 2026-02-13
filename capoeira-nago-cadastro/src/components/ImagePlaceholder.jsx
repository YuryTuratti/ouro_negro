import React from 'react';
import { motion } from 'framer-motion';
import './ImagePlaceholder.css';

/**
 * Componente ImagePlaceholder
 * Espaço reservado para a imagem do evento com animação vinda da esquerda
 */
const ImagePlaceholder = () => {
  // Variantes de animação - imagem vindo da ESQUERDA
  const imageVariants = {
    initial: {
      x: '-100vw', // Começa fora da tela à esquerda
      opacity: 0,
    },
    animate: {
      x: 0, // Vai para posição normal
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div 
      className="image-placeholder"
      variants={imageVariants}
      initial="initial"
      animate="animate"
      role="img"
      aria-label="Espaço reservado para imagem do evento CAPOEIRA NAGO"
    >
      <p className="image-placeholder__text">
        Espaço reservado para imagem do evento
      </p>
    </motion.div>
  );
};

export default ImagePlaceholder;
