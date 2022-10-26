import getChannelModal from './channels/index';

const mappingModal = {
  channel: (action) => getChannelModal(action),
};

const getModal = (isOpen, entity, action) => (isOpen && mappingModal[entity](action));

export default getModal;
