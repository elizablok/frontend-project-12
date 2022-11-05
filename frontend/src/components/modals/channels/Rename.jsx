import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { useApi } from '../../../contexts/ApiProvider';
import { channelsSelectors } from '../../../slices/channelsSlice';
import notify, { getCodedNotificationMessage } from '../../../notificator';
import LoadSpinner from '../../LoadSpinner';

const Rename = ({ isShown, entityId, closeHandler }) => {
  const { t } = useTranslation();
  const { renameChannel } = useApi();

  const allChannelsNames = useSelector(channelsSelectors.selectNames)
    .map(({ name }) => name);

  const nameRef = useRef(null);
  const channelName = useSelector((state) => channelsSelectors.selectById(state, entityId).name);

  const getFormError = (key) => `modals.channels.rename.form.errors.${key}`;

  const validationChannelsSchema = (channels) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(getFormError('required'))
      .min(3, getFormError('min'))
      .max(20, getFormError('max'))
      .notOneOf(channels, getFormError('notOneOf')),
  });

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channelName,
    },
    validationSchema: validationChannelsSchema(allChannelsNames),
    onSubmit: ({ name }) => renameChannel({ id: entityId, name })
      .then(() => {
        const codedMessage = getCodedNotificationMessage('channels', 'rename', 'success');

        closeHandler();
        notify('success', t(codedMessage));
      })
      .catch(() => {
        const codedMessage = getCodedNotificationMessage('channels', 'rename', 'error');

        notify('error', t(codedMessage));
      }),
  });

  const {
    values, errors, handleChange, handleSubmit, isSubmitting, dirty, isValid,
  } = formik;

  return (
    <Modal show={isShown} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.channels.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSubmitting ? <LoadSpinner /> : (
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
    </Modal>
  );
};

export default Rename;
