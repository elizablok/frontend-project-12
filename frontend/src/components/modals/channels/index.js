import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const channelModals = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

const getChannelModal = (type) => channelModals[type];

export default getChannelModal;
