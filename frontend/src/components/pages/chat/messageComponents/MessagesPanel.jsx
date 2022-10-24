import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import ChannelHeader from '../channelComponents/ChannelHeader';
import MessageForm from './MessageForm';
import Message from './Message';
import { getMessages } from '../../../../slices/messagesSlice';

const MessagesPanel = ({ channel }) => {
  const messages = useSelector(getMessages);
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
        <ChannelHeader name={channel.name} messagesNumber={channelMessages.length} />
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
