import { Col } from 'react-bootstrap';
import ChannelHeader from './ChannelHeader';
import ChannelForm from './ChannelForm';
import ChannelMessage from './ChannelMessage';
import { selectors } from '../../../slices/messagesSlice';
import store from '../../../slices/index';

const ChannelPanel = ({ channel }) => {
  const messages = Object.values(store.getState().channels.entities);
  const channelMessages = messages.filter((message) => message.channelId === channel.id);
  return (
    <Col className='p-0 h-100'>
      <div className='d-flex flex-column h-100'>
        <ChannelHeader name={channel.name} messagesNumber={channelMessages.length} />
        <div id='messages-box' className='chat-messages overflow-auto px-5'>
          {channelMessages && channelMessages.map(({ id, username, body }) => (
            <ChannelMessage key={id} username={username} body={body} />
          ))}
        </div>
        <ChannelForm />
      </div>
    </Col>
  );
}

export default ChannelPanel;