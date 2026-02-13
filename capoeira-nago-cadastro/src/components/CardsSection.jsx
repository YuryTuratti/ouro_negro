import React from 'react';
import { motion } from 'framer-motion';
import './CardsSection.css';

/**
 * Componente CardsSection
 * Seção de cards estilo Apple com informações sobre o evento
 */
const CardsSection = () => {
  // Dados dos cards - Paleta OURO NEGRO
  const cardsData = [
    {
      id: 1,
      textColor: '#E8D7A8',
      sobretitle: 'EXPERIÊNCIA CULTURAL',
      title: 'Roda de Capoeira',
      subtitle: 'Participe de uma autêntica roda',
      info: 'Sábados às 15h',
    },
    {
      id: 2,
      textColor: '#E8D7A8',
      sobretitle: 'AULAS ABERTAS',
      title: 'Aprenda com os Mestres',
      subtitle: 'Técnicas tradicionais da capoeira Angola',
      info: 'Terças e quintas',
    },
    {
      id: 3,
      textColor: '#E8D7A8',
      sobretitle: 'MÚSICA E CULTURA',
      title: 'Workshop de Instrumentos',
      subtitle: 'Berimbau, atabaque e pandeiro',
      info: 'Domingos às 10h',
    },
  ];

  // Variantes de animação para os cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="cards-section" aria-label="Eventos e atividades">
      <div className="cards-section__container">
        {/* Grid de cards */}
        <motion.div
          className="cards-section__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cardsData.map((card) => (
            <motion.article
              key={card.id}
              className="card"
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="card__content">
                <p className="card__sobretitle" style={{ color: '#D4AF37' }}>
                  {card.sobretitle}
                </p>
                
                <h3 className="card__title" style={{ color: card.textColor }}>
                  {card.title}
                </h3>
                
                <p className="card__subtitle" style={{ color: card.textColor }}>
                  {card.subtitle}
                </p>
                
                <p className="card__info" style={{ color: '#C9A961' }}>
                  {card.info}
                </p>
              </div>

              {/* Área de imagem */}
              <div className="card__image">
                <span className="card__image-text" style={{ color: '#E8D7A8' }}>
                  Imagem do evento
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CardsSection;
