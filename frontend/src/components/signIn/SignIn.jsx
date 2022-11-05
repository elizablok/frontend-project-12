import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';

import SignInForm from './SignInForm';
import signInImage from '../../assets/signInImage.jpg';

const SignIn = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={signInImage} className="rounded-circle" alt={t('forms.signIn.imgAlt')} />
              </div>
              <SignInForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('forms.signIn.footer.title')}</span>
                {' '}
                <a href="/signup">{t('forms.signIn.footer.linkText')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
