import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale'

/* Cor da marca: permanece idêntica nos dois temas (não alterar) */
const brandSecondary = '#eb5e28'

/* Tema escuro (paleta original do projeto) */
const darkTheme = {
  dark: true,
  colors: {
    /* --- fundos e superfícies --- */
    background: '#252422',
    surface: '#403d39',
    'surface-light': '#3A3A3C',
    'surface-variant': '#fcfcfc',
    'surface-bright': '#3b3b3b',
    'on-surface-bright': '#252422',
    chipSurface: '#e6e6e6',
    btnSurface: '#e4e4e4',

    /* --- texto --- */
    'on-surface': '#fffcf2',
    'on-surface-variant': '#fffcf2',
    'on-background': '#fffcf2',
    'on-bg': '#fffcf2',
    /* --- semânticas --- */
    primary: '#fffcf2', //text color
    secondary: brandSecondary, // bg hover color

    /* --- contraste sobre as cores semânticas --- */
    'on-primary': '#252422',
    'on-secondary': '#fffcf2',

    /* --- separador sólido (Apple opaqueSeparator) --- */
    'separator-opaque': '#C6C6C8',
  },
  variables: {
    'border-color': '#fffcf2',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.8,
    'medium-emphasis-opacity': 0.5,
    'disabled-opacity': 0.2,
    'overlay-multiplier': 0.6,
  },
}

/* Tema claro: mesma estrutura do escuro, com fundos claros e contraste escuro */
const lightTheme = {
  dark: false,
  colors: {
    /* --- fundos e superfícies --- */
    background: '#f6f3ec',
    surface: '#ffffff',
    'surface-light': '#fbf9f4',
    'surface-variant': '#e8e4d9',
    'surface-bright': '#ffffff',
    'on-surface-bright': '#252422',
    chipSurface: '#e6e6e6',
    btnSurface: '#e4e4e4',

    /* --- texto --- */
    'on-surface': '#252422',
    'on-surface-variant': '#3f3b36',
    'on-background': '#252422',
    'on-bg': '#252422',
    /* --- semânticas --- */
    primary: '#252422', //text color
    secondary: brandSecondary, // bg hover color (inalterada)

    /* --- contraste sobre as cores semânticas --- */
    'on-primary': '#fffcf2',
    'on-secondary': '#fffcf2',

    /* --- separador sólido (Apple opaqueSeparator) --- */
    'separator-opaque': '#C6C6C8',
  },
  variables: {
    'border-color': '#252422',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.8,
    'medium-emphasis-opacity': 0.5,
    'disabled-opacity': 0.2,
    'overlay-multiplier': 0.6,
  },
}

export const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'pt',
    fallback: 'en',
    messages: { pt },
  },
  theme: {
    /* 'system' segue a preferência do SO/navegador e reage a mudanças */
    defaultTheme: 'system',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },

  defaults: {
    VBtn: { variant: 'flat', elevation: 0 },
    VCard: { variant: 'flat', elevation: 0, rounded: 'lg' },
    VSnackbar: { rounded: 'lg' },
    VAlert: { variant: 'tonal', rounded: 'lg' },
    VTextField: { variant: 'outlined', density: 'compact', rounded: 'lg' },
    VTextarea: { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
    VSelect: { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
    VAutocomplete: { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
    VFileInput: { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
  },
})
