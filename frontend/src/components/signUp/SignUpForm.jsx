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

const SignUpForm = () => {
  const { t } = useTranslation();
  const [isRegistrnFailed, setIsRegistrnFailed] = useState(false);
  const userContainer = useRef(null);
  const { signIn } = useAuthn();
  const location = useLocation();
  const navigate = useNavigate();

  const registerUser = async (username, password) => {
    const { token } = await axios
      .post(getRoutes.signUpPath(), {
        username,
        password,
      })
      .then(({ data }) => data);
    return { token, username };
  };

  useEffect(() => {
    userContainer.current.focus();
  }, []);

  const validateSchema = yup.object().shape({
    username: yup
      .string()
      .required(t('forms.required'))
      .min(3, t('forms.signUp.errors.username.minmax'))
      .max(20, t('forms.signUp.errors.username.minmax')),
    password: yup
      .string()
      .required(t('forms.required'))
      .min(6, t('forms.signUp.errors.password.min')),
    confirmPassword: yup
      .string()
      .required(t('forms.required'))
      .oneOf([yup.ref('password')], t('forms.signUp.errors.confirmPassword.shouldMatch')),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      onSubmit={async ({ username, password }) => {
        try {
          const tokenData = await registerUser(username, password);
          setIsRegistrnFailed(false);
          signIn(tokenData);
          const { from } = location.state || {
            from: { pathname: getRoutes.chatPage() },
          };
          navigate(from);
        } catch (err) {
          if (err.isAxiosError) {
            if (err.response.status === 409) {
              setIsRegistrnFailed(true);
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
        isValid,
        touched,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit} className="w-50">
          <h1 className="text-center mb-4">{t('forms.signUp.title')}</h1>
          <Form.FloatingLabel className="mb-3" controlId="username" label={t('forms.signUp.username')}>
            <Form.Control
              type="text"
              className={`form-control${!errors.username ? '' : ' is-invalid'}`}
              name="username"
              required
              ref={userContainer}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={(!!errors.username || isRegistrnFailed) && touched.username}
              autoComplete="username"
              placeholder={t('forms.signUp.username')}
              value={values.username}
            />
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              {errors.username}
            </Form.Control.Feedback>
          </Form.FloatingLabel>
          <Form.FloatingLabel className="mb-3" controlId="password" label={t('forms.signUp.password')}>
            <Form.Control
              type="password"
              className={`form-control${!errors.password ? '' : ' is-invalid'}`}
              name="password"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={(!!errors.password || isRegistrnFailed) && touched.password}
              autoComplete="password"
              placeholder={t('forms.signUp.password')}
              value={values.password}
            />
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              {errors.password}
            </Form.Control.Feedback>
          </Form.FloatingLabel>
          <Form.FloatingLabel className="mb-3" controlId="confirmPassword" label={t('forms.signUp.confirmPassword')}>
            <Form.Control
              type="password"
              className={`form-control${!errors.confirmPassword ? '' : ' is-invalid'}`}
              name="confirmPassword"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                (!!errors.confirmPassword || isRegistrnFailed) && touched.confirmPassword
              }
              autoComplete="new-password"
              placeholder={t('forms.signUp.passwordsMustMatch')}
              value={values.confirmPassword}
            />
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              {
              isRegistrnFailed
                ? t('forms.signUp.errors.username.unavailable')
                : errors.confirmPassword
              }
            </Form.Control.Feedback>
          </Form.FloatingLabel>
          <Button
            variant="outline-primary"
            className="w-100 mb-3"
            type="submit"
            disabled={!isValid && !dirty}
          >
            {t('forms.signUp.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
