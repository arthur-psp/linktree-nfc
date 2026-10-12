import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale'

const lightTheme = {
  dark: false,
  colors: {
    /* --- fundos e superfícies --- */
    background: '#fff',
    surface: '#ffedd5',
    'surface-light': '#3A3A3C',
    'surface-variant': '#fcfcfc',
    'surface-bright': '#3b3b3b',
    'on-surface-bright': '#FFFFFF',
    chipSurface: '#e6e6e6',
    btnSurface: '#e4e4e4',

    /* --- texto --- */
    'on-surface': '#ea580b',
    'on-surface-variant': '#ea580b',
    'on-background': '#ea580b',
    'on-bg': '#ea580b',
    /* --- semânticas --- */
    primary: '#ea580b', //text color
    secondary: '#f97316', // bg hover color

    /* --- separador sólido (Apple opaqueSeparator) --- */
    'separator-opaque': '#C6C6C8',
  },
  variables: {
    'border-color': '#000000',
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
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme
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
