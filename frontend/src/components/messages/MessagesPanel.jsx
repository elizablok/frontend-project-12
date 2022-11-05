import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import { useTranslation } from 'react-i18next';

import MessageForm from './MessageForm';
import Message from './Message';
import { messagesSelectors } from '../../slices/messagesSlice';

const MessagesPanel = ({ channel }) => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);
  const channelMessages = messages.filter((message) => message.channelId === channel.id);

  useEffect(() => {
    animateScroll.scrollToBottom({
      duration: 0,
      containerId: 'messages-box',
    });
  }, [channelMessages.length]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {channel.name}
            </b>
          </p>
          <span className="text-muted">
            {`${channelMessages.length} ${t('chat.messages')}`}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 h-100">
          {channelMessages && channelMessages.map(({ id, username, body }) => (
            <Message key={id} username={username} body={body} />
          ))}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default MessagesPanel;
