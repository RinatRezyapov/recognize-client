import * as i18next from 'i18next';
import { createSharedState } from '../hooks/useSharedState';

const defaultLanguage = window.navigator.language && window.navigator.language.substr(0, 2);

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translations: {
        'SignIn': 'SignIn',
        'Change language': 'Change language',
        'Login': 'Login',
        'Password': 'Password',
        'Settings': 'Settings',
        'Create course': 'Create course',
      },
    },
    ru: {
      translations: {
        'SignIn': 'Войти',
        'Change language': 'Изменить язык',
        'Login': 'Логин',
        'Password': 'Пароль',
        'Settings': 'Настройки',
        'Create course': 'Создать курс',
      },
    },
  },
  fallbackLng: 'en',
  debug: false,
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});

const useSharedState = createSharedState('en');

export const useI18n = () => {

  const [language, setLanguage] = useSharedState();

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
    setLanguage(lng)
  }

  const t = i18next.t;

  return {
    t,
    language,
    changeLanguage,
  }
}
