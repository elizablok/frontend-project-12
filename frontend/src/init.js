import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import resources from './locales/index.js';

const init = async () => {
  const defaultlanguage = 'ru';

  await i18n
    .use(initReactI18next)
    .init({
      lng: defaultlanguage,
      debug: false,
      resources,
    });

  return (
    <I18nextProvider i18={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default init;
