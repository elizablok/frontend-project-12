import { useDispatch, useSelector } from 'react-redux';
import { getModalState, closeModal } from '../../slices/modalsSlice';
import getModal from './index';

const Modal = () => {
  const {
    isOpen, type, entity, id,
  } = useSelector(getModalState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const ActiveModal = getModal(isOpen, entity, type);

  return (
    isOpen
    && <ActiveModal isShown={isOpen} entity={entity} entityId={id} closeHandler={handleClose} />
  );
};

export default Modal;
