import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalsSelectors, closeModal } from '../../slices/modalsSlice';
import getModal from './index';

const Modal = () => {
  const {
    type, data,
  } = useSelector(modalsSelectors.selectTypeAndData);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const isOpen = useSelector(modalsSelectors.isOpen);
  const [action, entity] = isOpen ? type.split(' ') : [null, null];
  const ActiveModal = getModal(isOpen, entity, action);

  return (
    isOpen
    && (
    <ActiveModal
      isShown={isOpen}
      entity={entity}
      entityId={data && data.id}
      closeHandler={handleClose}
    />
    )
  );
};

export default Modal;
