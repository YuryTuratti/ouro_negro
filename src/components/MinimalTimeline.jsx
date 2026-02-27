import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './MinimalTimeline.css';

const scheduleData = [
  {
    id: 'sex', day: "SEXTA", date: "10/07",
    events: [ { time: "18:00", title: "Credenciamento", icon: "📝" }, { time: "19:30", title: "Roda de Abertura", icon: "🔥" }, { time: "21:00", title: "Jantar", icon: "🍽️" } ]
  },
  {
    id: 'sab', day: "SÁBADO", date: "11/07",
    events: [ { time: "08:00", title: "Café da Manhã", icon: "☕" }, { time: "09:30", title: "Vivência Angola", icon: "🤸‍♀️" }, { time: "12:00", title: "Almoço", icon: "🥘" }, { time: "14:00", title: "Workshop", icon: "🪘" }, { time: "16:30", title: "Roda Aberta", icon: "☀️" } ]
  },
  {
    id: 'dom', day: "DOMINGO", date: "12/07",
    events: [ { time: "09:00", title: "Papo de Mestre", icon: "🗣️" }, { time: "11:00", title: "Encerramento", icon: "🎓" }, { time: "13:00", title: "Despedida", icon: "👋" } ]
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
                    // Usamos "linear" no flicker para as trocas serem mais secas e realistas
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
                        <div key={idx} className="popup-event-row">
                          <span className="popup-time">{event.time}</span>
                          <span className="popup-title">{event.icon} {event.title}</span>
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