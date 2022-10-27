import React, {
  useContext, createContext, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import store from '../slices/index';
import { channelsActions, channelsSelectors } from '../slices/channelsSlice';
import mappingLoadingState from '../mappingStates';

const ApiContext = createContext({});
const useApi = () => useContext(ApiContext);

const wrapSocket = (socketFunc) => (...args) => new Promise((resolve, reject) => {
  socketFunc(...args, (response) => {
    if (response.status === 'ok') {
      resolve(response.data);
    }
    reject();
  });
})
  .then((channel) => {
    store.dispatch(
      channelsActions.setLoading({ state: mappingLoadingState.pending, error: null }),
    );
    store.dispatch(channelsActions.setCurrent(channel.id));
  })
  .catch((error) => {
    store.dispatch(
      channelsActions.setLoading({ state: mappingLoadingState.failed, error }),
    );
  });

const ApiProvider = ({ socket, children }) => {
  const currentChannelId = useSelector(channelsSelectors.selectCurrentId);
  const socketApi = useMemo(() => ({
    sendMessage: (payload) => socket.emit('newMessage', payload),
    createChannel: wrapSocket((...payload) => socket.volatile.emit('newChannel', ...payload)),
    removeChannel: (payload) => {
      socket.emit('removeChannel', payload);
      if (currentChannelId === payload.id) {
        const defaultChannelId = 1;
        store.dispatch(channelsActions.setCurrent(defaultChannelId));
      }
    },
    renameChannel: (payload) => socket.emit('renameChannel', payload),
  }), [socket, currentChannelId]);

  return (
    <ApiContext.Provider value={socketApi}>{children}</ApiContext.Provider>
  );
};

export { ApiContext, useApi };

export default ApiProvider;
