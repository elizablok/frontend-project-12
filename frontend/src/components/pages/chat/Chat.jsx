import { Container, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChannelsPanel from './channelComponents/ChannelsPanel';
import MessagesPanel from './messageComponents/MessagesPanel';
import {
  fetchData, getChannels, getChannelById, getCurrentChannelId,
  getLoading, getError,
} from '../../../slices/channelsSlice';
import { useAuth } from '../../../contexts/AuthProvider';
import LoadingErrorButton from './LoadingErrorButton';
import LoadSpinner from './LoadSpinner';

const Chat = () => {
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(getAuthHeader()));
  }, [dispatch, getAuthHeader]);

  const channels = useSelector((state) => getChannels(state));
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannel = useSelector((state) => getChannelById(state, currentChannelId));

  console.log(useSelector((state) => state.channels));

  const loading = useSelector(getLoading);
  const isLoading = () => loading;
  const loadingError = useSelector(getError);

  const handleReload = () => fetchData(getAuthHeader());

  return (
    isLoading() ? <LoadSpinner /> : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          { loadingError ? (
            <LoadingErrorButton loadingError={loadingError} reloadHandler={handleReload} />
          ) : (
            <>
              <ChannelsPanel channels={channels} />
              <MessagesPanel channel={currentChannel} />
            </>
          ) }
        </Row>
      </Container>
    )
  );
};

export default Chat;
