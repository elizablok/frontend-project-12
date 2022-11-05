import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useApi } from '../../../contexts/ApiProvider';
import notify, { getCodedNotificationMessage } from '../../../notificator';
import { channelsActions, channelsSelectors } from '../../../slices/channelsSlice';
import LoadSpinner from '../../LoadSpinner';

const Remove = ({ isShown, entityId, closeHandler }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const { removeChannel } = useApi();
  const currentChannelId = useSelector(channelsSelectors.selectCurrentId);

  const handleRemove = () => {
    setIsPending(true);
    return removeChannel({ id: entityId })
      .then(() => {
        const codedMessage = getCodedNotificationMessage('channels', 'remove', 'success');

        setIsPending(false);
        closeHandler();

        if (currentChannelId === entityId) {
          const defaultChannelId = 1;
          dispatch(channelsActions.setCurrent(defaultChannelId));
        }

        notify('success', t(codedMessage));
      })
      .catch(() => {
        const codedMessage = getCodedNotificationMessage('channels', 'remove', 'error');

        setIsPending(false);
        notify('error', t(codedMessage));
      });
  };

  return (
    <Modal show={isShown} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modals.channels.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isPending ? <LoadSpinner /> : (
          <p className="lead">{t('modals.channels.remove.body')}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={closeHandler}>{t('modals.cancel')}</Button>
          <Button variant="danger" disabled={isPending} onClick={handleRemove}>{t('modals.submit')}</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
