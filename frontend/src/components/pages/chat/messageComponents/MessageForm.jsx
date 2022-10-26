import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import filter from 'leo-profanity';
import { useApi } from '../../../../contexts/ApiProvider';
import { useAuthn } from '../../../../contexts/AuthnProvider';
import { channelsSelectors } from '../../../../slices/channelsSlice';

const ChannelForm = () => {
  const { t } = useTranslation();
  const messageRef = useRef(null);
  const { sendMessage } = useApi();
  const { username } = useAuthn().user;
  const channelId = useSelector(channelsSelectors.selectCurrentId);

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ body: '' }}
        onSubmit={async ({ body }, { resetForm }) => {
          sendMessage({ body: filter.clean(body), channelId, username });
          resetForm({});
        }}
      >
        {({
          values, handleSubmit, handleChange, isSubmitting, dirty,
        }) => (
          <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
            <Form.Group className="input-group">
              <Form.Control
                ref={messageRef}
                className="border-0 p-0 ps-2"
                name="body"
                value={values.body}
                aria-label={t('forms.message.ariaLabel')}
                placeholder={t('forms.message.placeholder')}
                disabled={isSubmitting}
                onChange={handleChange}
              />
              <Button type="submit" variant="group-vertical" disabled={isSubmitting || !dirty}>
                <ArrowRightSquare size={20} />
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChannelForm;
