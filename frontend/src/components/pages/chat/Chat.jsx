import { Container, Row } from 'react-bootstrap';
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsPanel from './channelComponents/ChannelsPanel';
import MessagesPanel from './messageComponents/MessagesPanel';
import {
  fetchData, channelsSelectors, channelsActions,
} from '../../../slices/channelsSlice';
import { useAuthn } from '../../../contexts/AuthnProvider';
import LoadingErrorButton from './LoadingErrorButton';
import LoadSpinner from './LoadSpinner';
import notify, { getCodedNotificationMessage } from '../../../notificator';
import mappingLoadingState from '../../../mappingStates';

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

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(channelsSelectors.selectCurrentId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );

  const loadingError = useSelector(channelsSelectors.selectLoadingError);
  const isLoading = useSelector(channelsSelectors.isLoading);

  if (currentChannel && isLoading) {
    dispatch(
      channelsActions.setLoading({ state: mappingLoadingState.done, error: null }),
    );
  }

  return (
    isLoading ? <LoadSpinner /> : (
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
