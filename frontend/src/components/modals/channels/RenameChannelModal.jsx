import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useApi } from '../../../contexts/ApiProvider';
import { getChannels, getChannelById } from '../../../slices/channelsSlice';
import notify, { getCodedNotificationMessage } from '../../../notificator';

const RenameChannelModal = ({ isShown, entityId, closeHandler }) => {
  const { t } = useTranslation();
  const { renameChannel } = useApi();

  const allChannelsNames = useSelector(getChannels)
    .map(({ name }) => name);

  const nameRef = useRef(null);
  const channelName = useSelector((state) => getChannelById(state, entityId).name);

  const validationChannelsSchema = (channels) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('required')
      .min(3, 'channelNameLenght')
      .max(20, 'channelNameLenght')
      .notOneOf(channels, 'duplicate'),
  });

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channelName,
    },
    validationSchema: validationChannelsSchema(allChannelsNames),
    onSubmit: ({ name }) => {
      try {
        renameChannel({ id: entityId, name });
        closeHandler();

        const codedMessage = getCodedNotificationMessage('channels', 'rename', 'success');
        notify('success', t(codedMessage));
      } catch (e) {
        const codedMessage = getCodedNotificationMessage('channels', 'rename', 'error');
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
        <Modal.Title>{t('modals.channels.rename.title')}</Modal.Title>
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

export default RenameChannelModal;
