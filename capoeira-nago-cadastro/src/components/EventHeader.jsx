import React from 'react';
import { motion } from 'framer-motion';
import './EventHeader.css';

/**
 * Componente EventHeader
 * Título do evento com animação de entrada
 */
const EventHeader = () => {
  return (
    <section className="event-header" aria-labelledby="event-title">
      <div className="event-header__container">
        
        {/* O bloco do Botão CTA foi removido daqui para focar na hierarquia visual */}

        {/* Título do Evento */}
        <motion.h2 
          id="event-title"
          className="event-header__title"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Conheça o Evento
        </motion.h2>
      </div>
    </section>
  );
};

export default EventHeader;