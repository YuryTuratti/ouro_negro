import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__container">
        <div className="app-footer__row">
          <span className="app-footer__item">
            <strong>PRODUTORA CULTURAL:</strong> VETERANA AKAÉSSE KAONNY
          </span>
          <span className="app-footer__separator">|</span>
          <span className="app-footer__item">
            <strong>ORGANIZAÇÃO:</strong> CAPOEIRA NAGÔ MONTE CARMELO
          </span>
        </div>
        <div className="app-footer__row">
          <span className="app-footer__item">
            <strong>COORDENAÇÃO:</strong> CONTRAMESTRE NEGOSANN
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;