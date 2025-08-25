import { FlatCompat } from '@eslint/eslintrc'
import security from 'eslint-plugin-security'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  // Mantiene reglas estilo Next.js / Core Web Vitals / TS
  ...compat.config({
    extends: ['next', 'next/core-web-vitals', 'next/typescript'],
  }),
  // Capa adicional de seguridad para TS/JS/React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      security,
    },
    rules: {
      // Reglas recomendadas de eslint-plugin-security
      'security/detect-eval-with-expression': 'error',
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-non-literal-require': 'error',
      'security/detect-object-injection': 'off', // puede ser ruidosa en apps web
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-pseudoRandomBytes': 'warn',
    },
  },
]
