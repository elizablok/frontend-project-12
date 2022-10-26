import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  channelsActions, channelsSelectors,
} from '../../../../slices/channelsSlice';
import ChannelButton from './ChannelButton';
import ChannelDropdown from './ChannelDropdown';
import { openModal } from '../../../../slices/modalsSlice';

const Channel = ({ id, name }) => {
  const dispatch = useDispatch();

  const currentChannelId = useSelector(channelsSelectors.selectCurrentId);
  const variant = id === currentChannelId ? 'secondary' : 'light';

  const basicClassName = 'w-100 rounded-0 text-start';
  const initialChannelsIds = [1, 2];
  const isInitialChannel = (channelId) => initialChannelsIds.includes(channelId);
  const className = isInitialChannel(id) ? basicClassName : `${basicClassName} text-truncate`;

  const changeActiveChannel = () => {
    dispatch(channelsActions.setCurrent(id));
  };

  const handleRename = () => {
    dispatch(openModal({ type: 'rename channel', data: { id } }));
  };

  const handleRemove = () => {
    dispatch(openModal({ type: 'remove channel', data: { id } }));
  };

  const channelButton = (
    <ChannelButton
      variant={variant}
      className={className}
      name={name}
      changeActiveChannelHandler={changeActiveChannel}
    />
  );
  const channelDropdown = (
    <ChannelDropdown
      channelButton={channelButton}
      variant={variant}
      removeHandler={handleRemove}
      renameHandler={handleRename}
    />
  );

  return (
    isInitialChannel(id) ? channelButton : channelDropdown
  );
};

export default Channel;
