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
      sobretitle: 'MEGA ESTRUTURA',
      title: 'Show Ouro Negro Capoeira',
      subtitle: 'Palco monumental com som, iluminação e telões de alta definição.',
      image: '/estrutura_capoeira.jpeg',
    },
    {
      id: 2,
      textColor: '#E8D7A8',
      sobretitle: 'ENCONTRO PEDAGÓGICO',
      title: 'Camisa do Evento',
      subtitle: 'Vista a nossa história. Edição exclusica Ouro Negro Capoeira',
      image: '/modelo_camisa.png',
    },
    {
      id: 3,
      textColor: '#E8D7A8',
      sobretitle: 'OFICINA MUSICAL',
      title: 'Técnicas de Atabaque',
      subtitle: 'Com a Instrutora Navalha',
      image: '/atabaque.png',
    },
    {
      id: 4,
      textColor: '#E8D7A8',
      sobretitle: 'OFICINA MUSICAL',
      title: 'Técnicas de Berimbau e Voz',
      subtitle: 'Com Monitora Anhuma',
      image: '/berimbau.png',
    },
    {
      id: 5,
      textColor: '#E8D7A8',
      sobretitle: 'OFICINA MUSICAL',
      title: 'Técnicas de Pandeiro',
      subtitle: 'Com Contramestra Rose',
      image: '/contramestra rose.jpeg',
    },
    {
      id: 6,
      textColor: '#E8D7A8',
      sobretitle: 'OFICINA PRÁTICA',
      title: 'Técnicas de Movimentação',
      subtitle: 'Com Mestra Luciana',
      image: '/movimentacao.jpeg',
    },
    {
      id: 7,
      textColor: '#E8D7A8',
      sobretitle: 'OFICINA PRÁTICA',
      title: 'Técnicas de Movimentação',
      subtitle: 'Mestranda Sinhá',
      image: '/movimentacao.jpeg',
    },
    {
      id: 8,
      textColor: '#E8D7A8',
      sobretitle: 'OFICINA PRÁTICA',
      title: 'Técnicas de Movimentação',
      subtitle: 'Professora Dandara',
      image: '/movimentacao.jpeg',
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
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="card__img" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CardsSection;
