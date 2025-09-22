import {config} from '@vue/test-utils'
import {createI18n} from 'vue-i18n'
import fr from '~/i18n/locales/fr.json'
import en from '~/i18n/locales/en.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'fr',
  messages: {fr, en},
})

config.global.plugins = [i18n]
