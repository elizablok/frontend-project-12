import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsPlusSquare } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../slices/modalsSlice';

const AddChannelButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openChannelForm = () => {
    dispatch(openModal({ type: 'add channel' }));
  };

  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('chat.channels')}</span>
      <Button variant="light" className="p-0 text-primary btn-group-vertical" onClick={openChannelForm}>
        <BsPlusSquare />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
};

export default AddChannelButton;
