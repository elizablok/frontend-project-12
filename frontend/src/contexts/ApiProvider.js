import React, {
  useContext, createContext, useMemo,
} from 'react';
import { channelsActions } from '../slices/channelsSlice';
import store from '../slices/index';

const ApiContext = createContext({});
const useApi = () => useContext(ApiContext);

const ApiProvider = ({ socket, children }) => {
  const socketApi = useMemo(() => ({
    sendMessage: (payload) => {
      socket.emit('newMessage', payload);
    },
    createChannel: (payload) => {
      socket.emit('newChannel', payload);
    },
    removeChannel: (payload) => {
      socket.emit('removeChannel', payload, (response) => {
        const DEFAULT_CHANNEL_ID = 1;
        store.dispatch(channelsActions.setCurrent(DEFAULT_CHANNEL_ID));

        return response.data;
      });
    },
    renameChannel: (payload) => {
      socket.emit('renameChannel', payload);
    },
  }), [socket]);

  return (
    <ApiContext.Provider value={socketApi}>{children}</ApiContext.Provider>
  );
};

export { ApiContext, useApi };

export default ApiProvider;
