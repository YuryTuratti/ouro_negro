import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import './InvestmentSection.css';

/**
 * Componente InvestmentSection
 * Seção de preços com 3 lotes progressivos e controle automático de status por data
 */
const InvestmentSection = () => {
  // Data atual (para testes, pode descomentar a linha abaixo para simular uma data específica)
  const hoje = new Date();
  // const hoje = new Date('2026-04-10'); // Descomente para testar Lote 1 ativo

  /**
   * Retorna o status do lote baseado na data atual
   * @param {Date} startDate - Data de início do lote
   * @param {Date} endDate - Data de fim do lote
   * @returns {string} - 'EXPIRED' | 'ACTIVE' | 'FUTURE'
   */
  const getLoteStatus = (startDate, endDate) => {
    if (hoje > endDate) return 'EXPIRED';
    if (hoje >= startDate && hoje <= endDate) return 'ACTIVE';
    return 'FUTURE';
  };

  const lotes = [
    { 
      numero: '1º Lote', 
      preco: 'R$ 250', 
      periodo: 'De 01/Abril a 01/Maio',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2026-05-01'),
      destaque: true
    },
    { 
      numero: '2º Lote', 
      preco: 'R$ 300', 
      periodo: 'De 01/Maio a 01/Junho',
      startDate: new Date('2026-05-01'),
      endDate: new Date('2026-06-01'),
      destaque: false
    },
    { 
      numero: '3º Lote', 
      preco: 'R$ 350', 
      periodo: 'De 01/Junho a 12/Junho',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-06-12'),
      destaque: false
    }
  ];

  /**
   * Retorna o texto e propriedades do botão baseado no status
   */
  const getButtonProps = (status) => {
    switch (status) {
      case 'ACTIVE':
        return { text: 'INSCREVER-SE', disabled: false, variant: 'primary' };
      case 'EXPIRED':
        return { text: 'ENCERRADO', disabled: true, variant: 'disabled' };
      case 'FUTURE':
        return { text: 'EM BREVE', disabled: true, variant: 'outline' };
      default:
        return { text: 'EM BREVE', disabled: true, variant: 'outline' };
    }
  };

  return (
    <section className="investment-section" aria-labelledby="investment-title">
      <div className="investment-section__container">
        {/* Título da Seção */}
        <motion.h2
          id="investment-title"
          className="investment-section__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          INVESTIMENTO
        </motion.h2>

        {/* Grid de Cards de Lotes */}
        <div className="investment-section__grid">
          {lotes.map((lote, index) => {
            const status = getLoteStatus(lote.startDate, lote.endDate);
            const buttonProps = getButtonProps(status);
            const isDestaque = lote.destaque && status === 'ACTIVE';

            return (
              <motion.div
                key={index}
                className={`investment-card investment-card--${status.toLowerCase()} ${isDestaque ? 'investment-card--destaque' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                {/* Badge de Destaque (apenas se ACTIVE) */}
                {isDestaque && (
                  <div className="investment-card__badge">
                    Melhor Valor
                  </div>
                )}

                {/* Número do Lote */}
                <h3 className="investment-card__numero">{lote.numero}</h3>

                {/* Preço */}
                <p className="investment-card__preco">{lote.preco}</p>

                {/* Período */}
                <p className="investment-card__periodo">{lote.periodo}</p>

                {/* Botão de Ação */}
                <div className="investment-card__button">
                  <Button
                    variant={buttonProps.variant}
                    disabled={buttonProps.disabled}
                    onClick={() => {
                      if (status === 'ACTIVE') {
                        // Rolar para o formulário ou abrir modal
                        console.log('Abrir formulário de inscrição');
                      }
                    }}
                  >
                    {buttonProps.text}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Aviso de Abertura */}
        <motion.div
          className="investment-section__notice"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="investment-section__notice-text">
            Inscrições abertas a partir de <strong>01 de abril de 2026</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestmentSection;
