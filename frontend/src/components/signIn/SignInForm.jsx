import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import getRoutes from '../../routes';
import { useAuthn } from '../../contexts/AuthnProvider';
import notify, { getCodedNotificationMessage } from '../../notificator';

const logInUser = async (username, password) => {
  const { token } = await axios
    .post(getRoutes.signInPath(), {
      username,
      password,
    })
    .then(({ data }) => data);
  return { token, username };
};

const SignInForm = () => {
  const { t } = useTranslation();
  const [isAuthnFailed, setIsAuthnFailed] = useState(false);
  const userContainer = useRef(null);
  const { signIn } = useAuthn();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    userContainer.current.focus();
  }, []);

  const validateSchema = yup.object().shape({
    username: yup.string().typeError(('required')).required(t('required')),
    password: yup.string().typeError(t('required')).required(t('required')),
  });
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validateOnBlur
      onSubmit={async (values) => {
        try {
          const tokenData = await logInUser(values.username, values.password);
          signIn(tokenData);
          setIsAuthnFailed(false);
          const { from } = location.state || {
            from: { pathname: getRoutes.chatPage() },
          };
          navigate(from);
        } catch (err) {
          if (err.isAxiosError) {
            if (err.response.status === 401) {
              setIsAuthnFailed(true);
              userContainer.current.focus();
              return;
            }
            const codedMessage = getCodedNotificationMessage(null, 'fetchData', 'error');
            notify('error', t(codedMessage));
          }
          throw err;
        }
      }}
      validationSchema={validateSchema}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => (
        <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('forms.signIn.title')}</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="text"
              className={`form-control${!errors.username ? '' : ' in-valid'}`}
              name="username"
              required
              ref={userContainer}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={isAuthnFailed}
              autoComplete="username"
              placeholder={t('forms.signIn.username')}
              id="username"
              value={values.username}
            />
            <Form.Label htmlFor="username">{t('forms.signIn.username')}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="password"
              className={`form-control${!errors.password ? '' : ' in-valid'}`}
              name="password"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={isAuthnFailed}
              autoComplete="password"
              placeholder={t('forms.signIn.password')}
              id="password"
              value={values.password}
            />
            <Form.Label htmlFor="password">{t('forms.signIn.password')}</Form.Label>

            {isAuthnFailed ? (
              <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                {t('forms.signIn.error')}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <Button
            variant="outline-primary"
            className="w-100 mb-3"
            type="submit"
            disabled={!isValid && !dirty}
          >
            {t('forms.signIn.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
