import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../../../contexts/ApiProvider';
import { channelsSelectors } from '../../../slices/channelsSlice';
import notify, { getCodedNotificationMessage } from '../../../notificator';

const Add = ({ isShown, closeHandler }) => {
  const { t } = useTranslation();
  const { createChannel } = useApi();

  const allChannelsNames = useSelector(channelsSelectors.selectNames);

  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const validationChannelsSchema = (channels) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('required')
      .min(3, 'channelNameLenght')
      .max(20, 'channelNameLenght')
      .notOneOf(channels, 'duplicate'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationChannelsSchema(allChannelsNames),
    onSubmit: ({ name }) => {
      try {
        createChannel({ name });
        closeHandler();

        const codedMessage = getCodedNotificationMessage('channels', 'add', 'success');
        notify('success', t(codedMessage));
      } catch (e) {
        const codedMessage = getCodedNotificationMessage('channels', 'add', 'error');
        notify('error', t(codedMessage));
      }
    },
  });

  const {
    values, errors, handleChange, handleSubmit, isSubmitting, dirty,
  } = formik;

  return (
    <Modal show={isShown} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.channels.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.channels.label')}</Form.Label>
            <Form.Control
              type="text"
              ref={nameRef}
              id="name"
              name="name"
              value={values.name}
              required
              disabled={isSubmitting}
              isInvalid={errors.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback>{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" onClick={closeHandler}>
            {t('modals.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting || !dirty}>
            {t('modals.submit')}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default Add;