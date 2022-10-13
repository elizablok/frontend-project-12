import getChannelModal from './channels/index';

const mappingModal = {
  channel: (type) => getChannelModal(type),
};

const getModal = (isOpen, entity, type) => (isOpen
  && mappingModal[entity](type)
);

export default getModal;
