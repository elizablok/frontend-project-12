import i18n from 'i18next';
import leoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as MainProvider } from 'react-redux';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import App from './App';
import resources from './locales/index.js';
import store from './slices/index';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel, deleteChannel, changeChannel, setCurrentChannel,
} from './slices/channelsSlice';
import AuthnProvider from './contexts/AuthnProvider';
import ApiProvider from './contexts/ApiProvider';

const init = async (socket) => {
  const rollbarAccessToken = process.env.POST_CLIENT_ITEM_ACCESS_TOKEN;
  const rollbarConfig = {
    accessToken: rollbarAccessToken,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enviroment: 'production',
  };

  const lng = 'ru';

  const lngDict = leoProfanity.getDictionary(lng);
  leoProfanity.add(lngDict);

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', ({ id, name }) => {
    store.dispatch(addChannel({ id, name }));
    store.dispatch(setCurrentChannel(id));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(deleteChannel(payload.id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(changeChannel({ id, changes: { name } }));
  });

  await i18n
    .use(initReactI18next)
    .init({
      lng,
      debug: false,
      resources,
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <MainProvider store={store}>
          <I18nextProvider i18={i18n}>
            <AuthnProvider>
              <ApiProvider socket={socket}>
                <div className="h-100" id="chat">
                  <App />
                </div>
              </ApiProvider>
            </AuthnProvider>
          </I18nextProvider>
        </MainProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
