import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './MinimalTimeline.css';

const scheduleData = [
  {
    id: 'sex', day: "SEXTA", date: "10/07",
    events: [
      { time: "18:00", title: "Credenciamento", icon: "bi bi-person-vcard" },
      { time: "19:30", title: "Ciclo de Palestras", icon: "bi bi-mic-fill", subEvents: [
        { speaker: "Akaésse Kaonny", topic: "Além do Pódio: O que ninguém te conta sobre ser uma atleta em busca do autorendimento." },
        { speaker: "Gisele Rezende", topic: "Nutrição Esportiva Feminina: A ciência por trás da performance máxima." },
        { speaker: "Mestra Luciana", topic: "Entre a Tradição e o Pódio: Corpo, Identidade e Alta Performance na Capoeira." }
      ]},
      { time: "21:00", title: "Jantar", icon: "bi bi-shop" }
    ]
  },
  {
    id: 'sab', day: "SÁBADO", date: "11/07",
    events: [
      { time: "07:00", title: "Café da Manhã e Cred", description: 'Entrega do kit: "Tesouro Ouro Negro" e camiseta oficial.', icon: "bi bi-cup-hot-fill" },
      { time: "08:00", title: "Mestra Luciana", description: "Dominando a Roda: Inteligência Tática e Movimentação Progressiva.", icon: "bi bi-lightning-charge-fill" },
      { time: "08:50", title: "Instrutora Navalha Fiu (Atabaque)", description: "Variações e viradas: Como sair do básico sem perder a cadência.", icon: "bi bi-music-note-list" },
      { time: "09:40", title: "Professora Dandara", description: "Ginga de Alto Rendimento: O Caminho para o Pódio.", icon: "bi bi-award-fill" },
      { time: "10:30", title: "Roda de Ouro", description: "Colocando o aprendizado em prática.", icon: "bi bi-fire" },
      { time: "11:30", title: "Resenha Gastronômica", description: "Nutrição, troca de conhecimento e descanso.", icon: "bi bi-shop" },
      { time: "14:00", title: "Contramestra Rose (Pandeiro)", description: "Pandeiro de Ouro: Técnica e floreio dominando o ritmo.", icon: "bi bi-music-note-beamed" },
      { time: "14:50", title: "Mestranda Sinhá", description: "Fundamento e Explosão: A Tática de Ouro construindo o jogo das campeãs.", icon: "bi bi-lightning-fill" },
      { time: "15:40", title: "Monitora Anhuma (Berimbau)", description: "O fundamento de ouro: A arte de reger o axé e o poder da voz.", icon: "bi bi-music-note" },
      { time: "16:30", title: "Roda de Ouro", description: "Colocando o aprendizado e fundamento em prática.", icon: "bi bi-fire" },
      { time: "20:00", title: "Show Cultural", description: "A Noite do Ouro: O espetáculo da força feminina.", icon: "bi bi-stars" }
    ]
  },
  {
    id: 'dom', day: "DOMINGO", date: "12/07",
    events: [
      { time: "09:00", title: "Café da manhã", description: "O Despertar Musical.", icon: "bi bi-cup-hot-fill" },
      { time: "10:00", title: "Ciclo de Palestras", icon: "bi bi-mic-fill", subEvents: [
        { speaker: "Rosângela (Psicóloga)", topic: "A Esquiva do Medo: Fortalecendo a Mente para o Jogo da Vida." },
        { speaker: "Ana Flávia (Secretária das mulheres)", topic: "Além da roda: Sintonizando sua saúde com as fases do mês." },
        { speaker: "Patrícia Barreto (Biomédica)", topic: "Ouro na pele: Como o cuidado com a beleza potencializa a confiança na roda." }
      ]},
      { time: "11:30", title: "Cerimônia de Premiação", description: 'Entrega de certificados e títulos "Destaque Ouro Negro".', icon: "bi bi-trophy-fill" },
      { time: "12:00", title: "Encerramento", description: "Almoço e tardezinha com o Fuzuê Samba Soul.", icon: "bi bi-balloon-fill" }
    ]
  }
];

const MinimalTimeline = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(null);

  const handleMouseEnter = (index) => setActiveDayIndex(index);
  const handleMouseLeave = () => setActiveDayIndex(null);
  const handleClick = (index) => setActiveDayIndex(index);

  // 🟢 DEFINIMOS QUAL PONTO VAI PISCAR (Index 1 = Sábado)
  const FLICKER_INDEX = 1;

  return (
    <section className="minimal-timeline-section">
      <motion.h2 
        className="minimal-timeline-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        PROGRAMAÇÃO OFICIAL
      </motion.h2>
      
      <motion.p 
        className="timeline-instruction"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        (Toque no ponto para ver)
      </motion.p>
      
      {activeDayIndex !== null && (
        <div className="timeline-backdrop" onClick={() => setActiveDayIndex(null)}></div>
      )}
      
      <motion.div 
        className="minimal-timeline-container"
        initial={{ x: -150, opacity: 0 }} 
        whileInView={{ x: 0, opacity: 1 }}  
        viewport={{ once: true, amount: 0.3 }} 
        transition={{ type: "spring", stiffness: 40, damping: 15, duration: 1.2 }}
      >
        <div className="minimal-timeline-nav">
          <div className="svg-curve-container">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="timeline-svg">
              <motion.path 
                d="M 0,10 Q 25,25 50,10 T 100,10" 
                className="timeline-path" 
                initial={{ pathLength: 0 }} 
                whileInView={{ pathLength: 1 }} 
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }} 
              />
            </svg>
          </div>

          <div className="timeline-points-wrapper">
            {scheduleData.map((day, index) => {
              // 🟢 VERIFICA SE É O PONTO QUE VAI PISCAR
              const isFlickeringLight = index === FLICKER_INDEX;

              // Sequência Normal (Suave): Apagado -> Aceso -> Apagado
              const standardColors = ["#111", "#FFD700", "#111"];
              const standardShadows = ["0 0 0px rgba(255,215,0,0)", "0 0 15px rgba(255,215,0,1)", "0 0 0px rgba(255,215,0,0)"];

              // 🟢 Sequência de "Luz Estragada" (Caótica): Tenta acender várias vezes rápido, estabiliza e apaga.
              const flickerColors = ["#111", "#FFD700", "#111", "#FFD700", "#222", "#FFD700", "#FFD700", "#FFD700", "#111"];
              const flickerShadows = [
                "0 0 0px rgba(255,215,0,0)",
                "0 0 25px rgba(255,215,0,1)", // Flash forte
                "0 0 5px rgba(255,215,0,0.2)", // Quase apaga
                "0 0 20px rgba(255,215,0,1)", // Flash médio
                "0 0 10px rgba(255,215,0,0.5)", // Meia luz
                "0 0 15px rgba(255,215,0,1)", // Estabiliza aceso...
                "0 0 15px rgba(255,215,0,1)", // ...mantém aceso...
                "0 0 15px rgba(255,215,0,1)", // ...mantém aceso...
                "0 0 0px rgba(255,215,0,0)"   // Apaga final
              ];

              // Escolhe qual sequência usar
              const bgSequence = isFlickeringLight ? flickerColors : standardColors;
              const shadowSequence = isFlickeringLight ? flickerShadows : standardShadows;
              // A luz estragada precisa de um pouco mais de tempo para fazer o show dela
              const animDuration = isFlickeringLight ? 2 : 1.2;

              return (
              <motion.div 
                key={index} 
                className={`timeline-point-item ${index === activeDayIndex ? 'active' : ''}`}
                onClick={() => handleClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (index * 0.5), duration: 0.5 }}
              >
                <div className="timeline-dot-container">
                  
                  {/* 🟢 APLICAÇÃO DA SEQUÊNCIA DE LUZES ESCOLHIDA ACIMA */}
                  <motion.div 
                    className="timeline-dot"
                    initial={{ backgroundColor: "#111", boxShadow: "0 0 0px rgba(255,215,0,0)", scale: 1 }}
                    whileInView={{ 
                      backgroundColor: bgSequence, 
                      boxShadow: shadowSequence,
                      scale: [1, 1.3, 1] 
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: animDuration, delay: 0.5 + (index * 0.5), ease: isFlickeringLight ? "linear" : "easeInOut" }}
                  />
                  
                  {/* A onda só acende uma vez suavemente, mesmo na luz estragada, para não ficar confuso */}
                  <motion.div 
                    className="timeline-dot-ripple"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: [0, 1, 0], scale: [0, 1.6, 2] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 + (index * 0.5), ease: "easeOut" }}
                  />
                </div>
                
                <div className="timeline-label">
                  {/* O texto também pisca junto com a luz estragada! */}
                  <motion.span 
                    className="day-name"
                    initial={{ color: "#888" }}
                    whileInView={{ color: isFlickeringLight ? ["#888", "#FFD700", "#888", "#FFD700", "#888", "#FFD700", "#FFD700", "#FFD700", "#888"] : ["#888", "#FFD700", "#888"] }}
                    viewport={{ once: true }}
                    transition={{ duration: animDuration, delay: 0.5 + (index * 0.5), ease: isFlickeringLight ? "linear" : "easeInOut" }}
                  >
                    {day.day}
                  </motion.span>
                  <span className="day-date">{day.date}</span>
                </div>

                {index === activeDayIndex && (
                  <div className="timeline-popup" onClick={(e) => e.stopPropagation()}>
                    <div className="popup-header">
                      <h3 className="popup-day-title">{day.day}</h3>
                      <button className="popup-close-btn" onClick={() => setActiveDayIndex(null)}>✕</button>
                    </div>
                    
                    <div className="popup-scroll-area">
                      {day.events.map((event, idx) => (
                        <div key={idx} className="popup-event-row" style={{ alignItems: 'flex-start' }}>
                          <span className="popup-time" style={{ minWidth: '45px' }}>{event.time}</span>
                          
                          <div className="popup-event-details" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            {/* 🟢 TROCAMOS O EMOJI PELO ÍCONE DO BOOTSTRAP */}
                            <span className="popup-title" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <i className={event.icon} style={{ color: '#D4AF37', fontSize: '1rem' }}></i> 
                              {event.title}
                            </span>
                            
                            {/* Renderiza a descrição normal se existir */}
                            {event.description && (
                              <span className="popup-description" style={{ fontSize: '0.75rem', color: '#ccc', marginTop: '3px', lineHeight: '1.3' }}>
                                {event.description}
                              </span>
                            )}

                            {/* Renderiza a lista de palestrantes se existir */}
                            {event.subEvents && (
                              <ul className="popup-subevents-list" style={{ paddingLeft: '15px', marginTop: '8px', listStyleType: 'disc', color: '#ccc', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>
                                {event.subEvents.map((sub, subIdx) => (
                                  <li key={subIdx} style={{ marginBottom: '6px' }}>
                                    <strong style={{ color: '#E8D7A8' }}>{sub.speaker}:</strong> {sub.topic}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                      <div style={{ height: '10px' }}></div>
                    </div>
                    <div className="popup-arrow"></div>
                  </div>
                )}
              </motion.div>
            );
          })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MinimalTimeline;