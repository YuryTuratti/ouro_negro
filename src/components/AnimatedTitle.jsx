import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedTitle.css';

/**
 * Componente AnimatedTitle - Título vindo da direita
 * 
 * Animação simples:
 * - Começa fora da tela à direita
 * - Desliza para a posição final à esquerda
 * - Sincronizado com a imagem vindo da esquerda
 */
const AnimatedTitle = () => {
  // Variantes de animação - título vindo da DIREITA
  const titleVariants = {
    initial: {
      x: '100vw', // Começa fora da tela à direita
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
      className="animated-title"
      variants={titleVariants}
      initial="initial"
      animate="animate"
    >
      <img 
        src="/Captura de tela 2026-02-12 105724.png" 
        alt="OURO NEGRO" 
        className="animated-title__logo"
      />
    </motion.div>
  );
};

export default AnimatedTitle;
