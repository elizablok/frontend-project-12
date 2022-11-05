import { Container, Row, Button } from 'react-bootstrap';
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ChannelsPanel from './channels/ChannelsPanel';
import MessagesPanel from './messages/MessagesPanel';
import {
  fetchData, channelsSelectors,
} from '../slices/channelsSlice';
import { useAuthn } from '../contexts/AuthnProvider';
import LoadSpinner from './LoadSpinner';
import notify, { getCodedNotificationMessage } from '../notificator';
import mappingLoadingState from '../mappingStates';

const Chat = () => {
  const { getAuthnHeader, signOut } = useAuthn();
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

  const loadingError = useSelector(channelsSelectors.selectLoadingError);
  const isLoading = useSelector(channelsSelectors.isLoading);
  const loadingState = useSelector(channelsSelectors.selectLoadingState);

  if (loadingState === mappingLoadingState.failed) {
    if (loadingError.code === 'ERR_BAD_REQUEST') {
      signOut();
    }
  }

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(channelsSelectors.selectCurrentId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );

  return (
    isLoading ? <LoadSpinner /> : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          { loadingError ? (
            <div className="row h-100 bg-white ">
              <p>{loadingError}</p>
              <Button onClick={handleLoading}>{t('chat.errors.reload')}</Button>
            </div>
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
