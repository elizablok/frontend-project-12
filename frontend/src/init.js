import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import resources from './locales/index.js';
import { AuthProvider } from './contexts/AuthProvider';
import store from './slices/index';
import { Provider as MainProvider } from 'react-redux';

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
    <MainProvider store={store}>
      <I18nextProvider i18={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </MainProvider>
  );
};

export default init;
