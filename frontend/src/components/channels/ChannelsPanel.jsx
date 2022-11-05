import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Nav, Button } from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';

import Channel from './Channel';
import Modal from '../modals/Modal';
import { modalsActions } from '../../slices/modalsSlice';
import {
  channelsActions, channelsSelectors,
} from '../../slices/channelsSlice';

const ChannelsPannel = ({ channels }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(channelsSelectors.selectCurrentId);

  const isCurrent = (id) => id === currentChannelId;

  const handleAdd = () => {
    dispatch(modalsActions.open({ type: 'add channel' }));
  };

  const handleChoose = (id) => () => {
    dispatch(channelsActions.setCurrent(id));
  };

  const handleRename = (id) => () => {
    dispatch(modalsActions.open({ type: 'rename channel', data: { id } }));
  };

  const handleRemove = (id) => () => {
    dispatch(modalsActions.open({ type: 'remove channel', data: { id } }));
  };

  return (
    <>
      <Modal />
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>{t('chat.channels')}</span>
          <Button variant="light" className="p-0 text-primary btn-group-vertical" onClick={handleAdd}>
            <BsPlusSquare />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav defaultActiveKey="#general" className="flex-column nav-pills nav-fill px-2" as="ul">
          {channels.map((channel) => (
            <Nav.Item key={channel.id} className="w-100" as="li">
              <Channel
                channel={channel}
                isCurrent={isCurrent(channel.id)}
                handleChoose={handleChoose}
                handleRemove={handleRemove}
                handleRename={handleRename}
              />
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </>
  );
};

export default ChannelsPannel;
