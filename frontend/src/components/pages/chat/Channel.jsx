import { setCurrentChannel } from '../../../slices/channelsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const Channel = ({ id, name }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const variant = id === currentChannelId ? 'secondary' : 'light';

  const handleClick = () => {
    dispatch(setCurrentChannel(id));
  };

  return (
    <Button variant={variant} className='w-100 rounded-0 text-start' onClick={handleClick}>
      <span className='me-1'>#</span>
      {name}
    </Button>
  );
};

export default Channel;
