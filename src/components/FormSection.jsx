import React, { useState, useCallback } from 'react';
import Button from './Button';
import { 
  validateEmail, 
  validateName, 
  validatePhone, 
  validateAge, 
  validateCity,
  formatPhone,
  errorMessages
} from '../utils/validation';
import './FormSection.css';

/**
 * Componente FormSection
 * Formulário completo de cadastro com validação em tempo real
 * @param {Object} props
 * @param {React.RefObject} props.formRef - Ref para scroll suave
 */
const FormSection = ({ formRef }) => {
  const [formData, setFormData] = useState({
    // 1. DADOS PESSOAIS
    name: '',
    nickname: '',
    graduation: '',
    city: '',
    age: '',
    document: '',
    phone: '',
    email: '', 
    
    // 2. LOGÍSTICA
    arrivalDate: '',
    arrivalTime: '',
    returnDate: '',
    returnTime: '',
    transport: '',
    transportOther: '',
    
    // 3. PARTICIPAÇÃO
    soloShow: '',
    tshirtSize: '',
    
    // 4. ACESSIBILIDADE
    accessibility: '',
    emergencyContact: '',
    
    // 5. EXPECTATIVAS (Opcionais)
    trajectory: '',
    vision: '',
    essentials: '',
    
    // 6. TERMOS
    imageRights: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 🟢 Variável de estado para controlar a imagem da tabela de tamanhos
  const [isImageOpen, setIsImageOpen] = useState(false);

  // Debounce para validação
  const [validationTimeout, setValidationTimeout] = useState(null);

  /**
   * Valida um campo específico
   */
  const validateField = useCallback((fieldName, value) => {
    let error = '';

    // Campos opcionais que não precisam de validação de "required"
    const optionalFields = ['nickname', 'transportOther', 'accessibility', 'trajectory', 'vision', 'essentials', 'soloShow'];

    if (!value && !optionalFields.includes(fieldName)) {
      error = errorMessages.required || 'Este campo é obrigatório';
    } else {
      switch (fieldName) {
        case 'name':
          if (!validateName(value)) error = errorMessages.name;
          break;
        case 'email':
          if (!validateEmail(value)) error = errorMessages.email;
          break;
        case 'phone': 
          if (!validatePhone(value)) error = errorMessages.phone;
          break;
        case 'age':
          if (!validateAge(value)) error = errorMessages.age;
          break;
        case 'city':
          if (!validateCity(value)) error = errorMessages.city;
          break;
        default:
          break;
      }
    }

    return error;
  }, []);

  /**
   * Manipula mudanças nos inputs
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;

    // Lida com radio buttons e máscaras
    if (type === 'radio') {
      finalValue = checked ? value : formData[name];
    } else if (name === 'phone') { 
      finalValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    if (validationTimeout) {
      clearTimeout(validationTimeout);
    }

    if (touched[name]) {
      const timeoutId = setTimeout(() => {
        const error = validateField(name, finalValue);
        setErrors(prev => ({ ...prev, [name]: error }));
      }, 300);
      setValidationTimeout(timeoutId);
    }
  }, [touched, validationTimeout, validateField, formData]);

  /**
   * Marca campo como tocado ao perder foco
   */
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  /**
   * Manipula envio do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marca todos os campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validação manual de todos os campos antes de enviar
    let validationErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) validationErrors[key] = error;
    });
    
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Dados do formulário enviados:', formData);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar o formulário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="inscricao"
      ref={formRef} 
      className="form-section" 
      aria-labelledby="form-title"
    >
      <div className="form-section__container">
        <div className="form-section__card">
          <h2 id="form-title" className="form-section__title">
            Ficha de Inscrição
          </h2>
          <p className="form-section__subtitle">
            Evento Ouro Negro Capoeira
          </p>

          {submitSuccess && (
            <div className="form-section__success" role="alert" aria-live="polite">
              ✓ Cadastro realizado com sucesso! Redirecionando...
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            
            {/* 1. DADOS PESSOAIS */}
            <h3 className="form-section__group-title">1. Dados Pessoais</h3>
            <div className="form-grid">
              
              <div className="form-group form-group--full">
                <label htmlFor="name" className="form-label">Nome Completo <span aria-label="obrigatório">*</span></label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Digite seu nome completo"
                  className={`form-input ${errors.name && touched.name ? 'form-input--error' : ''}`}
                  required aria-required="true"
                />
                {errors.name && touched.name && <span id="name-error" className="form-error" role="alert">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="nickname" className="form-label">Apelido na Capoeira</label>
                <input
                  type="text" id="nickname" name="nickname"
                  value={formData.nickname} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Seu apelido (Opcional)"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="graduation" className="form-label">Graduação <span aria-label="obrigatório">*</span></label>
                <input
                  type="text" id="graduation" name="graduation"
                  value={formData.graduation} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Ex: Aluno, Graduado, Professor"
                  className={`form-input ${errors.graduation && touched.graduation ? 'form-input--error' : ''}`}
                  required aria-required="true"
                />
                {errors.graduation && touched.graduation && <span className="form-error" role="alert">{errors.graduation}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="city" className="form-label">Cidade/Estado <span aria-label="obrigatório">*</span></label>
                <input
                  type="text" id="city" name="city"
                  value={formData.city} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Ex: Monte Carmelo/MG"
                  className={`form-input ${errors.city && touched.city ? 'form-input--error' : ''}`}
                  required aria-required="true"
                />
                {errors.city && touched.city && <span className="form-error" role="alert">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="age" className="form-label">Idade <span aria-label="obrigatório">*</span></label>
                <input
                  type="number" id="age" name="age"
                  value={formData.age} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Sua idade" min="1" max="120"
                  className={`form-input ${errors.age && touched.age ? 'form-input--error' : ''}`}
                  required aria-required="true"
                />
                {errors.age && touched.age && <span className="form-error" role="alert">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="document" className="form-label">Documento (CPF ou RG) <span aria-label="obrigatório">*</span></label>
                <input
                  type="text" id="document" name="document"
                  value={formData.document} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Apenas números"
                  className={`form-input ${errors.document && touched.document ? 'form-input--error' : ''}`}
                  required aria-required="true"
                />
                {errors.document && touched.document && <span className="form-error" role="alert">{errors.document}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">WhatsApp/Telefone <span aria-label="obrigatório">*</span></label>
                <input
                  type="tel" id="phone" name="phone"
                  value={formData.phone} onChange={handleChange} onBlur={handleBlur}
                  placeholder="(00) 00000-0000" maxLength="15"
                  className={`form-input ${errors.phone && touched.phone ? 'form-input--error' : ''}`}
                  required aria-required="true"
                />
                {errors.phone && touched.phone && <span className="form-error" role="alert">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email <span aria-label="obrigatório">*</span></label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange} onBlur={handleBlur}
                  placeholder="seu@email.com"
                  className={`form-input ${errors.email && touched.email ? 'form-input--error' : ''}`}
                  required aria-required="true"
                />
                {errors.email && touched.email && <span className="form-error" role="alert">{errors.email}</span>}
              </div>
            </div>

            {/* 2. LOGÍSTICA E TRANSPORTE */}
            <h3 className="form-section__group-title">2. Logística e Transporte</h3>
            <div className="form-grid">
              
              <div className="form-group">
                <label htmlFor="arrivalDate" className="form-label">Data de Chegada <span aria-label="obrigatório">*</span></label>
                <select 
                  id="arrivalDate" name="arrivalDate" 
                  value={formData.arrivalDate} onChange={handleChange} onBlur={handleBlur}
                  className={`form-select ${errors.arrivalDate && touched.arrivalDate ? 'form-input--error' : ''}`}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="10/07">10/07</option>
                  <option value="11/07">11/07</option>
                  <option value="12/07">12/07</option>
                </select>
                {errors.arrivalDate && touched.arrivalDate && <span className="form-error" role="alert">{errors.arrivalDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="arrivalTime" className="form-label">Horário de Chegada <span aria-label="obrigatório">*</span></label>
                <input
                  type="time" id="arrivalTime" name="arrivalTime"
                  value={formData.arrivalTime} onChange={handleChange} onBlur={handleBlur}
                  className={`form-input ${errors.arrivalTime && touched.arrivalTime ? 'form-input--error' : ''}`}
                  required
                />
                {errors.arrivalTime && touched.arrivalTime && <span className="form-error" role="alert">{errors.arrivalTime}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="returnDate" className="form-label">Data de Retorno <span aria-label="obrigatório">*</span></label>
                <select 
                  id="returnDate" name="returnDate" 
                  value={formData.returnDate} onChange={handleChange} onBlur={handleBlur}
                  className={`form-select ${errors.returnDate && touched.returnDate ? 'form-input--error' : ''}`}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="10/07">10/07</option>
                  <option value="11/07">11/07</option>
                  <option value="12/07">12/07</option>
                </select>
                {errors.returnDate && touched.returnDate && <span className="form-error" role="alert">{errors.returnDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="returnTime" className="form-label">Horário de Retorno <span aria-label="obrigatório">*</span></label>
                <input
                  type="time" id="returnTime" name="returnTime"
                  value={formData.returnTime} onChange={handleChange} onBlur={handleBlur}
                  className={`form-input ${errors.returnTime && touched.returnTime ? 'form-input--error' : ''}`}
                  required
                />
                {errors.returnTime && touched.returnTime && <span className="form-error" role="alert">{errors.returnTime}</span>}
              </div>

              <div className="form-group form-group--full">
                <label className="form-label">Meio de Transporte <span aria-label="obrigatório">*</span></label>
                <div className="form-radio-group">
                  <label className="radio-label">
                    <input type="radio" name="transport" value="Ônibus" onChange={handleChange} checked={formData.transport === 'Ônibus'} /> Ônibus
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="transport" value="Carro Próprio" onChange={handleChange} checked={formData.transport === 'Carro Próprio'} /> Carro Próprio
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="transport" value="Outro" onChange={handleChange} checked={formData.transport === 'Outro'} /> Outro
                  </label>
                </div>
                {errors.transport && touched.transport && <span className="form-error" role="alert">{errors.transport}</span>}
                
                {formData.transport === 'Outro' && (
                  <input
                    type="text" name="transportOther"
                    value={formData.transportOther} onChange={handleChange}
                    placeholder="Especifique o transporte"
                    className="form-input" style={{ marginTop: '10px' }}
                  />
                )}
              </div>
            </div>

            {/* 3. PARTICIPAÇÃO */}
            <h3 className="form-section__group-title">3. Participação</h3>
            <div className="form-grid">
              
              <div className="form-group form-group--full">
                <label className="form-label">Tamanho da Camiseta <span aria-label="obrigatório">*</span></label>
                
                <div className="tshirt-selection-container">
                  <div className="form-radio-group">
                    {['BLP','BLM','BLG','BLGG','P', 'M', 'G', 'GG', 'EXG'].map(size => (
                      <label key={size} className="radio-label">
                        <input type="radio" name="tshirtSize" value={size} onChange={handleChange} checked={formData.tshirtSize === size} /> {size}
                      </label>
                    ))}
                  </div>

                  {/* MINIATURA DA IMAGEM */}
                  <div className="tshirt-thumbnail" onClick={() => setIsImageOpen(true)}>
                    <img src="/tamanho_camisa.jpeg" alt="Tabela de Tamanhos" />
                    <span className="tshirt-thumbnail-text">Ver tabela</span>
                  </div>
                </div>

                {errors.tshirtSize && touched.tshirtSize && <span className="form-error" role="alert">{errors.tshirtSize}</span>}
              </div>
            </div>

            {/* 4. ACESSIBILIDADE E EMERGÊNCIA */}
            <h3 className="form-section__group-title">4. Acessibilidade</h3>
            <div className="form-grid">
              <div className="form-group form-group--full">
                <label htmlFor="accessibility" className="form-label">Necessita de algum recurso de acessibilidade?</label>
                <input
                  type="text" id="accessibility" name="accessibility"
                  value={formData.accessibility} onChange={handleChange}
                  placeholder="Se sim, descreva (Opcional)"
                  className="form-input"
                />
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="emergencyContact" className="form-label">Contato de Emergência (Nome e Telefone) <span aria-label="obrigatório">*</span></label>
                <input
                  type="text" id="emergencyContact" name="emergencyContact"
                  value={formData.emergencyContact} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Nome do parente e Telefone"
                  className={`form-input ${errors.emergencyContact && touched.emergencyContact ? 'form-input--error' : ''}`}
                  required
                />
                {errors.emergencyContact && touched.emergencyContact && <span className="form-error" role="alert">{errors.emergencyContact}</span>}
              </div>
            </div>

            {/* 5. EXPECTATIVAS E TRAJETÓRIA */}
            <h3 className="form-section__group-title">5. Expectativas e Trajetória</h3>
            <div className="form-grid">
              
              <div className="form-group form-group--full">
                <label htmlFor="trajectory" className="form-label">Conte-nos um pouco sobre sua trajetória na capoeira</label>
                <textarea
                  id="trajectory" name="trajectory"
                  value={formData.trajectory} onChange={handleChange}
                  placeholder="(Opcional)"
                  className="form-textarea"
                />
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="vision" className="form-label">Qual sua visão e o que espera deste evento?</label>
                <textarea
                  id="vision" name="vision"
                  value={formData.vision} onChange={handleChange}
                  placeholder="(Opcional)"
                  className="form-textarea"
                />
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="essentials" className="form-label">O que não pode faltar nesta edição?</label>
                <textarea
                  id="essentials" name="essentials"
                  value={formData.essentials} onChange={handleChange}
                  placeholder="(Opcional)"
                  className="form-textarea"
                />
              </div>
            </div>

            {/* 6. TERMOS */}
            <h3 className="form-section__group-title">6. Termo de Imagem e Voz</h3>
            <div className="form-group form-group--full">
              <p style={{ color: '#E8D7A8', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.5' }}>
                Eu autorizo o uso da minha imagem e voz para fins de registro e divulgação do evento Ouro Negro Capoeira. Esta autorização abrange a captação de fotos e vídeos durante toda a programação, permitindo a publicação em sites oficiais, redes sociais e materiais de preservação da memória cultural.
              </p>
              <div className="form-radio-group" style={{ flexDirection: 'column', gap: '10px' }}>
                <label className="radio-label">
                  <input type="radio" name="imageRights" value="CONCORDO" onChange={handleChange} checked={formData.imageRights === 'CONCORDO'} /> 
                  CONCORDO com o uso de imagem e voz.
                </label>
                <label className="radio-label">
                  <input type="radio" name="imageRights" value="NÃO CONCORDO" onChange={handleChange} checked={formData.imageRights === 'NÃO CONCORDO'} /> 
                  NÃO CONCORDO com o uso de imagem e voz.
                </label>
              </div>
              {errors.imageRights && touched.imageRights && <span className="form-error" role="alert">{errors.imageRights}</span>}
            </div>

            {/* BOTÃO SUBMIT */}
            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting || submitSuccess}
            >
              {isSubmitting ? 'Validando...' : submitSuccess ? 'Redirecionando...' : 'Prosseguir para o Pagamento'}
            </Button>
            
          </form>
        </div>
      </div>

      {/* 🟢 MODAL DE TELA CHEIA MOVIDO PARA FORA DO FORMULÁRIO (ISSO RESOLVE O BUG!) */}
      {isImageOpen && (
        <div className="tshirt-modal-overlay" onClick={() => setIsImageOpen(false)}>
          <div className="tshirt-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="tshirt-modal-close" onClick={() => setIsImageOpen(false)}>✕</button>
            <img src="/tamanho_camisa.jpeg" alt="Tabela de Tamanhos Ampliada" className="tshirt-modal-image" />
          </div>
        </div>
      )}

    </section>
  );
};

export default FormSection;