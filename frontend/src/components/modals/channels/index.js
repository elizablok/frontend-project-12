import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const channelModals = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
};

const getChannelModal = (type) => channelModals[type];

export default getChannelModal;
