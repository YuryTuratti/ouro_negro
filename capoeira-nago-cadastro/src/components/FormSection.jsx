import React, { useState, useCallback } from 'react';
import Button from './Button';
import { 
  validateEmail, 
  validateName, 
  validatePhone, 
  validateAge, 
  validateCity,
  formatPhone,
  errorMessages,
  validateForm
} from '../utils/validation';
import './FormSection.css';

/**
 * Componente FormSection
 * Formulário completo de cadastro com validação em tempo real
 * 
 * @param {Object} props
 * @param {React.RefObject} props.formRef - Ref para scroll suave
 */
const FormSection = ({ formRef }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    city: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Debounce para validação
  const [validationTimeout, setValidationTimeout] = useState(null);

  /**
   * Valida um campo específico
   */
  const validateField = useCallback((fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'name':
        if (!value) {
          error = errorMessages.required;
        } else if (!validateName(value)) {
          error = errorMessages.name;
        }
        break;
      case 'email':
        if (!value) {
          error = errorMessages.required;
        } else if (!validateEmail(value)) {
          error = errorMessages.email;
        }
        break;
      case 'phone':
        if (!value) {
          error = errorMessages.required;
        } else if (!validatePhone(value)) {
          error = errorMessages.phone;
        }
        break;
      case 'age':
        if (!value) {
          error = errorMessages.required;
        } else if (!validateAge(value)) {
          error = errorMessages.age;
        }
        break;
      case 'city':
        if (!value) {
          error = errorMessages.required;
        } else if (!validateCity(value)) {
          error = errorMessages.city;
        }
        break;
      default:
        break;
    }

    return error;
  }, []);

  /**
   * Manipula mudanças nos inputs
   */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplica máscara de telefone
    if (name === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Limpa timeout anterior
    if (validationTimeout) {
      clearTimeout(validationTimeout);
    }

    // Valida com debounce apenas se o campo já foi tocado
    if (touched[name]) {
      const timeoutId = setTimeout(() => {
        const error = validateField(name, formattedValue);
        setErrors(prev => ({
          ...prev,
          [name]: error
        }));
      }, 300);
      setValidationTimeout(timeoutId);
    }
  }, [touched, validationTimeout, validateField]);

  /**
   * Marca campo como tocado ao perder foco
   */
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Valida imediatamente ao perder foco
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
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

    // Valida todos os campos
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // Se houver erros, não envia
    if (Object.keys(validationErrors).length > 0) {
      // Foca no primeiro campo com erro
      const firstErrorField = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    // Simula envio
    setIsSubmitting(true);

    try {
      // Simula requisição API (substitua com sua lógica)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Dados do formulário enviados:', formData);
      
      setSubmitSuccess(true);
      
      // Reseta formulário após 3 segundos
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          age: '',
          city: ''
        });
        setTouched({});
        setErrors({});
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
      ref={formRef} 
      className="form-section" 
      aria-labelledby="form-title"
    >
      <div className="form-section__container">
        <div className="form-section__card">
          <h2 id="form-title" className="form-section__title">
            Complete seu Cadastro
          </h2>
          <p className="form-section__subtitle">
            Preencha os dados abaixo para participar
          </p>

          {submitSuccess && (
            <div
              className="form-section__success"
              role="alert"
              aria-live="polite"
            >
              ✓ Cadastro realizado com sucesso!
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Nome Completo */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nome Completo <span aria-label="obrigatório">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Digite seu nome completo"
                className={`form-input ${errors.name && touched.name ? 'form-input--error' : ''}`}
                required
                aria-required="true"
                aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
              />
              {errors.name && touched.name && (
                <span id="name-error" className="form-error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email <span aria-label="obrigatório">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="seu@email.com"
                className={`form-input ${errors.email && touched.email ? 'form-input--error' : ''}`}
                required
                aria-required="true"
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              />
              {errors.email && touched.email && (
                <span id="email-error" className="form-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Telefone */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Telefone <span aria-label="obrigatório">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="(00) 00000-0000"
                maxLength="15"
                className={`form-input ${errors.phone && touched.phone ? 'form-input--error' : ''}`}
                required
                aria-required="true"
                aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
              />
              {errors.phone && touched.phone && (
                <span id="phone-error" className="form-error" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Idade */}
            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Idade <span aria-label="obrigatório">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Sua idade"
                min="1"
                max="120"
                className={`form-input ${errors.age && touched.age ? 'form-input--error' : ''}`}
                required
                aria-required="true"
                aria-invalid={errors.age && touched.age ? 'true' : 'false'}
                aria-describedby={errors.age && touched.age ? 'age-error' : undefined}
              />
              {errors.age && touched.age && (
                <span id="age-error" className="form-error" role="alert">
                  {errors.age}
                </span>
              )}
            </div>

            {/* Cidade */}
            <div className="form-group">
              <label htmlFor="city" className="form-label">
                Cidade <span aria-label="obrigatório">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Sua cidade"
                className={`form-input ${errors.city && touched.city ? 'form-input--error' : ''}`}
                required
                aria-required="true"
                aria-invalid={errors.city && touched.city ? 'true' : 'false'}
                aria-describedby={errors.city && touched.city ? 'city-error' : undefined}
              />
              {errors.city && touched.city && (
                <span id="city-error" className="form-error" role="alert">
                  {errors.city}
                </span>
              )}
            </div>

            {/* Botão de Envio */}
            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting || submitSuccess}
            >
              {isSubmitting ? 'Enviando...' : submitSuccess ? 'Cadastro Concluído!' : 'Enviar Cadastro'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
