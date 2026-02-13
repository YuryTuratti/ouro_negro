import React from 'react';
import './Button.css';

/**
 * Componente Button reutilizável com estilo Apple Premium
 * 
 * @param {Object} props
 * @param {Function} props.onClick - Função chamada ao clicar
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @param {string} props.variant - Variante do botão ('primary', 'secondary')
 * @param {boolean} props.disabled - Se o botão está desabilitado
 * @param {string} props.type - Tipo do botão ('button', 'submit')
 * @param {string} props.className - Classes CSS adicionais
 */
const Button = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  disabled = false, 
  type = 'button',
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button--${variant} ${className}`}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
