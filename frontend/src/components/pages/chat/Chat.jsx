import { Container, Row } from 'react-bootstrap';
import ChannelPanel from './ChannelPanel';
import ChannelsPanel from './ChannelsPanel';
import { selectors } from '../../../slices/channelsSlice';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../../slices/channelsSlice';
import { useAuth } from '../../../contexts/index';
import store from '../../../slices/index';

const Chat = () => {
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(getAuthHeader()));
  }, [dispatch, getAuthHeader]);
  const channels = Object.values(store.getState().channels.entities);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);

  return (
    <Container className='h-100 my-4 overflow-hidden rounded shadow'>
      <Row className='h-100 bg-white flex-md-row'>
        <ChannelPanel channel={currentChannel} />
        <ChannelsPanel channels={channels} />
      </Row>
    </Container>
  );
};

export default Chat;
