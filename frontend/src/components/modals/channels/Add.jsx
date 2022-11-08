import React, {
  useEffect, useState, useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { useApi } from '../../../contexts/ApiProvider';
import { channelsActions, channelsSelectors } from '../../../slices/channelsSlice';
import notify, { getCodedNotificationMessage } from '../../../notificator';
import LoadSpinner from '../../LoadSpinner';
import getValidationSchema from './validationSchema';

const Add = ({ isShown, closeHandler }) => {
  const allChannelsNames = useSelector(channelsSelectors.selectNames);
  const channelsIds = useSelector(channelsSelectors.selectIds);

  const [loading, setLoading] = useState({ state: null, id: null });
  const addedChannelId = loading.id;
  const isLoading = loading.state === 'pending';
  const isAdded = channelsIds.includes(addedChannelId);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { createChannel } = useApi();

  const handleLoading = useCallback(() => {
    if (isLoading && isAdded) {
      const codedMessage = getCodedNotificationMessage('channels', 'add', 'success');

      setLoading({ state: 'done', id: null });
      dispatch(channelsActions.setCurrent(addedChannelId));

      closeHandler();
      notify('success', t(codedMessage));
    }
  }, [addedChannelId, t, closeHandler, dispatch, isAdded, isLoading]);

  useEffect(() => {
    handleLoading();
  }, [handleLoading]);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidationSchema('add', allChannelsNames),
    onSubmit: ({ name }) => createChannel({ name })
      .then((channel) => setLoading({ state: 'pending', id: channel.id }))
      .catch(() => {
        const codedMessage = getCodedNotificationMessage('channels', 'add', 'error');

        setLoading({ state: 'failed', id: null });

        notify('error', t(codedMessage));
      }),
  });

  const {
    values, errors, handleChange, handleSubmit, isSubmitting, dirty, isValid,
  } = formik;

  return (
    <Modal show={isShown} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.channels.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSubmitting ? <LoadSpinner /> : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="visually-hidden" htmlFor="name">{t('modals.channels.label')}</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                id="name"
                name="name"
                value={values.name}
                required
                disabled={isSubmitting}
                isInvalid={!isValid}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">{t(errors.name)}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" onClick={closeHandler}>
              {t('modals.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting || !dirty || !isValid}>
              {t('modals.submit')}
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default Add;
