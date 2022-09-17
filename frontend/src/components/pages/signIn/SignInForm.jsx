import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as cn from 'classnames';

const SignInForm = () => {
  const [isAuthFailed] = useState(false);
  const userContainer = useRef(null);
  const { t } = useTranslation();
  const validateSchema = yup.object().shape({
    username: yup.string().typeError(('required')).required(t('forms.required')),
    password: yup.string().typeError(t('forms.required')).required(t('forms.required')),
  });

  useEffect(() => {
    userContainer.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validateOnBlur
      validationSchema={validateSchema}
      onSubmit={() => null}
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
            <Form.Control type="text" ref={userContainer} id="username" className={cn({ 'in-valid': errors.username })} autoComplete="username" placeholder={t('forms.signIn.username')} name="username" value={values.username} isInvalid={isAuthFailed} onChange={handleChange} onBlur={handleBlur} />
            <Form.Label htmlFor="username">{t('forms.signIn.username')}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control type="password" id="password" className={cn({ 'in-valid': errors.password })} placeholder={t('forms.password')} name="password" value={values.password} isInvalid={isAuthFailed} onChange={handleChange} onBlur={handleBlur} />
            <Form.Label htmlFor="password">{t('forms.password')}</Form.Label>
            {isAuthFailed && (
              <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                {t('notValidUsernameOrPassword')}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button variant="primary" className="w-100 mb-3" type="submit" disabled={!isValid && !dirty}>
            {t('forms.signIn.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
