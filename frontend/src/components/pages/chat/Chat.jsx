import { Container, Row } from 'react-bootstrap';
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsPanel from './channelComponents/ChannelsPanel';
import MessagesPanel from './messageComponents/MessagesPanel';
import {
  fetchData, getChannels, getChannelById, getCurrentChannelId,
  getLoading, getError,
} from '../../../slices/channelsSlice';
import { useAuthn } from '../../../contexts/AuthnProvider';
import LoadingErrorButton from './LoadingErrorButton';
import LoadSpinner from './LoadSpinner';
import notify, { getCodedNotificationMessage } from '../../../notificator';

const Chat = () => {
  const { getAuthnHeader } = useAuthn();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLoading = useCallback(() => {
    try {
      dispatch(fetchData(getAuthnHeader()));
    } catch (e) {
      const codedMessage = getCodedNotificationMessage(null, 'fetchData', 'error');
      notify('error', t(codedMessage));
    }
  }, [dispatch, getAuthnHeader, t]);

  useEffect(() => {
    handleLoading();
  }, [handleLoading]);

  const channels = useSelector((state) => getChannels(state));
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannel = useSelector((state) => getChannelById(state, currentChannelId));

  const loading = useSelector(getLoading);
  const isLoading = () => loading;
  const loadingError = useSelector(getError);

  return (
    isLoading() ? <LoadSpinner /> : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          { loadingError ? (
            <LoadingErrorButton loadingError={loadingError} reloadHandler={handleLoading} />
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
