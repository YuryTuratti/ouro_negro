# CAPOEIRA NAGO - Página de Cadastro

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-FF0055?logo=framer)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)

Página de cadastro premium para o evento CAPOEIRA NAGO, com design inspirado na Apple e animações cinematográficas.

## ✨ Características

- **Design Premium Apple-like**: Interface limpa e elegante inspirada no design system da Apple
- **Animações Cinematográficas**: Título com sequência de animação complexa usando Framer Motion
- **Validação em Tempo Real**: Formulário com validação completa e feedback instantâneo
- **Totalmente Responsivo**: Mobile-first design com breakpoints otimizados
- **Acessível**: WCAG AA compliance com navegação por teclado e ARIA labels
- **Performance Otimizada**: 60fps constantes nas animações

## 🎬 Animação do Título

A animação do título segue uma sequência cinematográfica em 5 fases:

1. **Estado Inicial (0s)**: Título no centro da tela, invisível
2. **Fade In (0-2s)**: Aparecimento suave no centro
3. **Pausa Dramática (2-2.5s)**: Título permanece visível
4. **Deslize (2.5-4s)**: Movimento suave para canto superior esquerdo
5. **Estado Final (4s+)**: Título fixo no canto superior esquerdo

## 🎨 Paleta de Cores

```css
Branco Puro:       #FFFFFF
Off-White:         #FAFAF8
Verde Escuro:      #1D4620
Cinza Médio:       #6E6E73
Verde Vibrante:    #00A86B
Verde Hover:       #00925E
Verde Claro:       #E8F5E9
Vermelho Erro:     #FF3B30
```

## 📋 Pré-requisitos

- Node.js 16.0 ou superior
- npm 7.0 ou superior

## 🚀 Instalação

1. **Clone ou navegue até o diretório do projeto:**

```bash
cd c:\PROGRAMACAO\capoeira-nago-cadastro
```

2. **Instale as dependências:**

```bash
npm install
```

## 💻 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O projeto será aberto automaticamente no navegador em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Preview da Build

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
capoeira-nago-cadastro/
├── index.html                  # HTML principal
├── package.json                # Dependências e scripts
├── vite.config.js              # Configuração do Vite
├── src/
│   ├── main.jsx                # Entry point
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos do App
│   ├── components/
│   │   ├── AnimatedTitle.jsx   # Título com animação cinematográfica
│   │   ├── AnimatedTitle.css
│   │   ├── Button.jsx          # Botão reutilizável
│   │   ├── Button.css
│   │   ├── HeroSection.jsx     # Seção hero com CTA
│   │   ├── HeroSection.css
│   │   ├── ImagePlaceholder.jsx # Placeholder para imagem
│   │   ├── ImagePlaceholder.css
│   │   ├── FormSection.jsx     # Formulário completo
│   │   └── FormSection.css
│   ├── styles/
│   │   └── global.css          # Reset e variáveis CSS
│   └── utils/
│       └── validation.js       # Funções de validação
```

## 🔧 Componentes Principais

### 1. AnimatedTitle
Título com animação cinematográfica complexa usando Framer Motion.

```jsx
<AnimatedTitle />
```

### 2. HeroSection
Seção hero com título animado, descrição, imagem placeholder e botão CTA.

```jsx
<HeroSection onCTAClick={scrollToForm} />
```

### 3. FormSection
Formulário completo com validação em tempo real e feedback visual.

```jsx
<FormSection formRef={formRef} />
```

### 4. Button
Botão reutilizável com variantes primary e secondary.

```jsx
<Button variant="primary" onClick={handleClick}>
  Texto do Botão
</Button>
```

### 5. ImagePlaceholder
Container para imagem com proporções controladas e estilo premium.

```jsx
<ImagePlaceholder />
```

## 📝 Validação de Formulário

O formulário valida os seguintes campos:

- **Nome**: Deve conter nome e sobrenome (mínimo 3 caracteres)
- **Email**: Formato de email válido (regex)
- **Telefone**: Formato brasileiro `(XX) XXXXX-XXXX` com máscara automática
- **Idade**: Número entre 1 e 120
- **Cidade**: Mínimo 2 caracteres

Validação acontece:
- Em tempo real após o primeiro blur (com debounce de 300ms)
- Ao enviar o formulário
- Feedback visual imediato (cores e mensagens de erro)

## 🎯 Funcionalidades

### Scroll Suave
Botão "Venha Participar" rola suavemente para o formulário:

```javascript
const scrollToForm = () => {
  formRef.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
```

### Máscara de Telefone
Formatação automática para telefones brasileiros:

```javascript
// Input: 11987654321
// Output: (11) 98765-4321
```

### Estados do Formulário
- **Normal**: Pronto para preenchimento
- **Validação**: Feedback em tempo real
- **Enviando**: Botão desabilitado com texto "Enviando..."
- **Sucesso**: Mensagem verde de confirmação

## 🎨 Customização

### Alterar Cores

Edite as variáveis CSS em [src/styles/global.css](src/styles/global.css):

```css
:root {
  --color-accent: #00A86B;
  --color-text-primary: #1D4620;
  /* outras variáveis... */
}
```

### Ajustar Animações

Modifique as variantes no [AnimatedTitle.jsx](src/components/AnimatedTitle.jsx):

```javascript
const titleVariants = {
  initial: { /* ... */ },
  fadeIn: { 
    duration: 2, // Ajuste a duração aqui
  },
  // ...
};
```

## 📱 Responsividade

Breakpoints:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ♿ Acessibilidade

- ✅ Navegação completa por teclado
- ✅ Labels associados a todos os inputs
- ✅ ARIA labels e roles
- ✅ Mensagens de erro anunciadas por screen readers
- ✅ Contraste de cores WCAG AA
- ✅ Focus indicators visíveis
- ✅ Suporte a `prefers-reduced-motion`

## 🚀 Performance

- Animações otimizadas para 60fps
- Debounce na validação (300ms)
- Lazy loading de componentes
- CSS otimizado com custom properties
- Build minificado com Vite

## 🐛 Troubleshooting

### Porta 3000 já está em uso
```bash
# Use outra porta
npm run dev -- --port 3001
```

### Animações não aparecem
- Verifique se o Framer Motion foi instalado corretamente
- Limpe o cache: `rm -rf node_modules && npm install`

### Erros no console
- Verifique a versão do Node.js (mínimo 16.0)
- Execute `npm install` novamente

## 📦 Dependências

### Produção
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `framer-motion`: ^10.16.16

### Desenvolvimento
- `@vitejs/plugin-react`: ^4.2.1
- `vite`: ^5.0.8

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

## 👥 Contato

Para dúvidas ou sugestões sobre o projeto CAPOEIRA NAGO, entre em contato através do formulário de cadastro.

---

**Desenvolvido com ❤️ usando React, Framer Motion e design inspirado na Apple**
