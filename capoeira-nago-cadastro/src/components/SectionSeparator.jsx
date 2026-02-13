import React from 'react';
import { motion } from 'framer-motion';
import './SectionSeparator.css';

/**
 * Componente SectionSeparator
 * Faixa ornamental com padrão tribal dourado para separar seções
 */
const SectionSeparator = () => {
  return (
    <motion.div 
      className="section-separator"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  );
};

export default SectionSeparator;
