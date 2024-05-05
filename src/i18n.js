import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguegeDetector from 'i18next-browser-languagedetector'
import en from './locales/en/translation.json'
import vi from './locales/vi/translation.json'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguegeDetector)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi }
    },
    supportedLngs: ['vi', 'en'],
    fallbackLng: 'en',
    detection: {
      order: ['queryString', 'cookie', 'localStorage'],
      cache: ['localStorage']
    }
  })

export default i18n
