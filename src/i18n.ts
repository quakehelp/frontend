import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
if (!localStorage.getItem('i18nextLng')) {
  localStorage.setItem('i18nextLng', 'ar');
   }
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'ar',
   // lng:'ar',
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;