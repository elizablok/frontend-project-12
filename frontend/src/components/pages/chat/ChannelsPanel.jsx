import { Col } from 'react-bootstrap';
import AddChannelButton from './AddChannelButton';
import { Nav } from 'react-bootstrap';
import Channel from './Channel';

const ChannelsPannel = ({ channels }) => {
  return (
    <Col className='col-4 col-md-2 border-end pt-5 px-0 bg-light'>
      <AddChannelButton />
      <Nav defaultActiveKey="#general" className="flex-column nav-pills nav-fill px-2" as="ul">
        {channels.map(({id, name}) => (
          <Nav.Item key={id} className="w-100" as="li">
            <Channel id={id} name={name} />
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
}

export default ChannelsPannel;