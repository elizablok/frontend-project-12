import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import SignUpForm from './SignUpForm';
import signUpImage from '../../assets/signUpImage.jpg';

const SignUp = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signUpImage} className="rounded-circle" alt={t('forms.signUp.imgAlt')} />
              </div>
              <SignUpForm />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
