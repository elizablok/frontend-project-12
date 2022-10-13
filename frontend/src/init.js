import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as MainProvider } from 'react-redux';
import App from './App';
import resources from './locales/index.js';
import AuthProvider from './contexts/AuthProvider';
import store from './slices/index';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel, deleteChannel, changeChannel, setCurrentChannel,
} from './slices/channelsSlice';
import ApiProvider from './contexts/ApiProvider';

const init = async (socket) => {
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
          <ApiProvider socket={socket}>
            <div className="h-100" id="chat">
              <App />
            </div>
          </ApiProvider>
        </AuthProvider>
      </I18nextProvider>
    </MainProvider>
  );
};

export default init;
