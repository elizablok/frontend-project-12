import React, {
  useContext, createContext, useMemo,
} from 'react';

const ApiContext = createContext({});
const useApi = () => useContext(ApiContext);

const wrapSocket = (socketFunc) => (...args) => new Promise((resolve, reject) => {
  socketFunc(...args, (response) => {
    if (response.status === 'ok') {
      resolve(response.data);
    }
    reject();
  });
});

const ApiProvider = ({ socket, children }) => {
  const socketApi = useMemo(() => ({
    sendMessage: wrapSocket((...payload) => socket.volatile.emit('newMessage', ...payload)),
    createChannel: wrapSocket((...payload) => socket.volatile.emit('newChannel', ...payload)),
    removeChannel: wrapSocket((...payload) => socket.volatile.emit('removeChannel', ...payload)),
    renameChannel: wrapSocket((...payload) => socket.volatile.emit('renameChannel', ...payload)),
  }), [socket]);

  return (
    <ApiContext.Provider value={socketApi}>{children}</ApiContext.Provider>
  );
};

export { ApiContext, useApi };

export default ApiProvider;
