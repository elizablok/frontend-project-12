import { Button } from 'react-bootstrap';

const ChannelButton = ({
  variant, className, changeActiveChannelHandler, name,
}) => (
  <Button variant={variant} className={className} onClick={changeActiveChannelHandler}>
    <span className="me-1">#</span>
    {name}
  </Button>
);

export default ChannelButton;
