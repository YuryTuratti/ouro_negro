/**
 * Funções de validação para o formulário de cadastro
 */

/**
 * Valida formato de email
 * @param {string} email - Email a ser validado
 * @returns {boolean} - true se válido
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida nome completo (deve ter pelo menos nome e sobrenome)
 * @param {string} name - Nome a ser validado
 * @returns {boolean} - true se válido
 */
export const validateName = (name) => {
  const trimmedName = name.trim();
  return trimmedName.length >= 3 && trimmedName.includes(' ');
};

/**
 * Valida telefone brasileiro (formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX)
 * @param {string} phone - Telefone a ser validado
 * @returns {boolean} - true se válido
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Valida idade
 * @param {number} age - Idade a ser validada
 * @returns {boolean} - true se válido
 */
export const validateAge = (age) => {
  const ageNum = parseInt(age, 10);
  return !isNaN(ageNum) && ageNum >= 1 && ageNum <= 120;
};

/**
 * Valida cidade (mínimo 2 caracteres)
 * @param {string} city - Cidade a ser validada
 * @returns {boolean} - true se válido
 */
export const validateCity = (city) => {
  return city.trim().length >= 2;
};

/**
 * Aplica máscara de telefone brasileiro
 * @param {string} value - Valor do input
 * @returns {string} - Valor com máscara aplicada
 */
export const formatPhone = (value) => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
};

/**
 * Remove caracteres especiais do telefone para validação
 * @param {string} phone - Telefone formatado
 * @returns {string} - Apenas números
 */
export const cleanPhone = (phone) => {
  return phone.replace(/\D/g, '');
};

/**
 * Mensagens de erro personalizadas
 */
export const errorMessages = {
  name: 'Por favor, insira seu nome completo (nome e sobrenome)',
  email: 'Por favor, insira um email válido',
  phone: 'Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX',
  age: 'Por favor, insira uma idade válida entre 1 e 120 anos',
  city: 'Por favor, insira o nome da sua cidade',
  required: 'Este campo é obrigatório'
};

/**
 * Valida todos os campos do formulário
 * @param {Object} formData - Dados do formulário
 * @returns {Object} - Objeto com erros (vazio se tudo válido)
 */
export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name || !validateName(formData.name)) {
    errors.name = errorMessages.name;
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = errorMessages.email;
  }

  if (!formData.phone || !validatePhone(formData.phone)) {
    errors.phone = errorMessages.phone;
  }

  if (!formData.age || !validateAge(formData.age)) {
    errors.age = errorMessages.age;
  }

  if (!formData.city || !validateCity(formData.city)) {
    errors.city = errorMessages.city;
  }

  return errors;
};
