// import React, { useState, useRef, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Form, Button } from 'react-bootstrap';
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import * as cn from 'classnames';
// import axios from 'axios';
// import getRoutes from '../../../routes';
// import { useAuth } from '../../../contexts/index';

// const SignInForm = () => {
//   const [isAuthFailed, setIsAuthFailed] = useState(false);
//   const userContainer = useRef(null);
//   const { t } = useTranslation();
//   const validateSchema = yup.object().shape({
//     username: yup.string().typeError(('required')).required(t('forms.required')),
//     password: yup.string().typeError(t('forms.required')).required(t('forms.required')),
//   });

//   useEffect(() => {
//     userContainer.current.focus();
//   }, []);

//   const getData = async ({ username, password }) => {
//     const res = await axios.post(getRoutes.signInPath(), { username, password });
//     const token = res.data.token;
//     return { token, username };
//   }

//   return (
//     <Formik
//       initialValues={{ username: '', password: '' }}
//       validateOnBlur
//       validationSchema={validateSchema}
//       onSubmit={async (values) => {
//         try {
//           console.log('sdkk');
//           const userData = await getData(values);
//           console.log(useAuth());
//           const { signIn } = useAuth();
//           signIn(userData);
//           values.username = '';
//           values.password = '';
//           setIsAuthFailed(false);
//           navigate(getRoutes.chatPage());
//         } catch(e) {
//           // if (e.isAxiosError) {
//           //   setIsAuthFailed(true);
//           //   userContainer.current.focus();
//           //   return;
//           // }
//           throw e;
//         }
//       }}
//     >
//       {({
//         values,
//         errors,
//         handleChange,
//         handleBlur,
//         isValid,
//         handleSubmit,
//         dirty,
//       }) => (
//         <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
//           <h1 className="text-center mb-4">{t('forms.signIn.title')}</h1>
//           <Form.Group className="form-floating mb-3">
//             <Form.Control type="text" ref={userContainer} id="username" className={cn({ 'in-valid': errors.username })} autoComplete="username" placeholder={t('forms.signIn.username')} name="username" value={values.username} isInvalid={isAuthFailed} onChange={handleChange} onBlur={handleBlur} />
//             <Form.Label htmlFor="username">{t('forms.signIn.username')}</Form.Label>
//           </Form.Group>
//           <Form.Group className="form-floating mb-3">
//             <Form.Control type="password" id="password" className={cn({ 'in-valid': errors.password })} autoComplete="password" placeholder={t('forms.password')} name="password" value={values.password} isInvalid={isAuthFailed} onChange={handleChange} onBlur={handleBlur} />
//             <Form.Label htmlFor="password">{t('forms.password')}</Form.Label>
//             {isAuthFailed && (
//               <Form.Control.Feedback type="invalid" className="invalid-tooltip">
//                 {t('forms.signIn.error')}
//               </Form.Control.Feedback>
//             )}
//           </Form.Group>
//           <Button variant="primary" className="w-100 mb-3" type="submit" disabled={!isValid && !dirty}>
//             {t('forms.signIn.submit')}
//           </Button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default SignInForm;

import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import getRoutes from '../../../routes.js';
import { useAuth } from '../../../contexts/AuthProvider.js';

const getData = async (username, password) => {
  const { token } = await axios
    .post(getRoutes.signInPath(), {
      username,
      password,
    })
    .then(({ data }) => data);
  return { token, username };
};

function SignInForm() {
  const { t } = useTranslation();
  const [isAuth, setIsAuth] = useState(false);
  const userContainer = useRef(null);
  const { logIn } = useAuth('');
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
          const token = await getData(values.username, values.password);
          logIn(token);
          values.username = '';
          values.password = '';
          setIsAuth(false);
          const { from } = location.state || {
            from: { pathname: getRoutes.chatPage() },
          };
          navigate(from);
        } catch (err) {
          if (err.isAxiosError && err.response.status === 401) {
            setIsAuth(true);
            userContainer.current.focus();
            return;
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
          <h1 className="text-center mb-4">{t('enter')}</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="text"
              className={`form-control${!errors.username ? '' : ' in-valid'}`}
              name="username"
              ref={userContainer}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={isAuth}
              autoComplete="username"
              placeholder={t('username')}
              id="username"
              value={values.username}
            />
            <Form.Label htmlFor="username">{t('username')}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="password"
              className={`form-control${!errors.password ? '' : ' in-valid'}`}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={isAuth}
              autoComplete="password"
              placeholder={t('password')}
              id="password"
              value={values.password}
            />
            <Form.Label htmlFor="password">{t('password')}</Form.Label>

            {isAuth ? (
              <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                {t('noValidUsername')}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <Button
            variant="outline-primary"
            className="w-100 mb-3"
            type="submit"
            disabled={!isValid && !dirty}
          >
            {t('enter')}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
