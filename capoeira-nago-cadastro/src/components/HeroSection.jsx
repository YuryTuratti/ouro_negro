import React from 'react';
import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import MinistrantesCarousel from './MinistrantesCarousel';
import './HeroSection.css';

/**
 * Componente HeroSection
 * Seção hero com título animado, descrição e imagem
 */
const HeroSection = () => {
  // Gera array de 45 partículas para densidade atmosférica
  const particles = Array.from({ length: 45 }, (_, i) => i);

  return (
  
    <section className="hero-section" aria-labelledby="hero-title">
      {/* Partículas Douradas Flutuantes */}
      <div className="particles">
        {particles.map((index) => (
          <div key={index} className="particle" />
        ))}
      </div>

      <div className="hero-section__container">
        {/* Grid com duas colunas */}
        <div className="hero-section__grid">
          {/* Coluna esquerda - Conteúdo textual */}
          <div className="hero-section__content">
            <AnimatedTitle />
            
            {/* Separador Decorativo */}
            <motion.div
              className="hero-section__divider"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 60 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Descrição com fade in após título */}
            <motion.p 
              className="hero-section__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
             O Ouro Negro celebra a força feminina que transforma tradição em identidade. Um território de coragem onde cada jogo afirma presença e cada mulher na roda é continuidade.
            </motion.p>
          </div>
          

          {/* Coluna direita - Carrossel de Ministrantes */}
          <div className="hero-section__image-container">
            <MinistrantesCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
