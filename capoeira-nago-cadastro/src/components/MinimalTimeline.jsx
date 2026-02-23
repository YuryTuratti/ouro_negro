import React, { useState } from 'react';
import './MinimalTimeline.css';

const scheduleData = [
  {
    id: 'sex',
    day: "SEXTA",
    date: "10/07",
    events: [
      { time: "18:00", title: "Credenciamento", icon: "📝" },
      { time: "19:30", title: "Roda de Abertura", icon: "🔥" },
      { time: "21:00", title: "Jantar", icon: "🍽️" }
    ]
  },
  {
    id: 'sab',
    day: "SÁBADO",
    date: "11/07",
    events: [
      { time: "08:00", title: "Café da Manhã", icon: "☕" },
      { time: "09:30", title: "Vivência Angola", icon: "🤸‍♀️" },
      { time: "12:00", title: "Almoço", icon: "🥘" },
      { time: "14:00", title: "Workshop", icon: "🪘" },
      { time: "16:30", title: "Roda Aberta", icon: "☀️" }
    ]
  },
  {
    id: 'dom',
    day: "DOMINGO",
    date: "12/07",
    events: [
      { time: "09:00", title: "Papo de Mestre", icon: "🗣️" },
      { time: "11:00", title: "Encerramento", icon: "🎓" },
      { time: "13:00", title: "Despedida", icon: "👋" }
    ]
  }
];

const MinimalTimeline = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(null);

  // Função auxiliar para lidar com o mouse (só funciona se não estiver travado pelo clique)
  const handleMouseEnter = (index) => {
    setActiveDayIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveDayIndex(null);
  };

  return (
    <section className="minimal-timeline-section">
      <h2 className="minimal-timeline-title">PROGRAMAÇÃO OFICIAL</h2>
      
      <p className="timeline-instruction">(Toque no ponto para ver)</p>
      
      {/* Backdrop para mobile (fecha ao clicar fora) */}
      {activeDayIndex !== null && (
        <div className="timeline-backdrop" onClick={() => setActiveDayIndex(null)}></div>
      )}
      
      <div className="minimal-timeline-container">
        <div className="minimal-timeline-nav">
          
          <div className="svg-curve-container">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="timeline-svg">
              <path d="M 0,10 Q 25,25 50,10 T 100,10" className="timeline-path" />
            </svg>
          </div>

          <div className="timeline-points-wrapper">
            {scheduleData.map((day, index) => (
              <div 
                key={index} 
                className={`timeline-point-item ${index === activeDayIndex ? 'active' : ''}`}
                onClick={() => setActiveDayIndex(index)}       /* Funciona no Celular */
                onMouseEnter={() => handleMouseEnter(index)}   /* Funciona no PC */
                onMouseLeave={handleMouseLeave}                /* Funciona no PC */
              >
                <div className="timeline-dot-container">
                  <div className="timeline-dot"></div>
                  <div className="timeline-dot-ripple"></div>
                </div>
                
                <div className="timeline-label">
                  <span className="day-name">{day.day}</span>
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
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MinimalTimeline;