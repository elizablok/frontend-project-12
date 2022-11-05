import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import {
  Navbar,
  Container,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/scss/main.scss';

import { useAuthn } from './contexts/AuthnProvider';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import MissingPage from './components/404';
import Chat from './components/Chat';
import getRoutes from './routes';

const App = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuthn();

  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar className="p-2 mb-2 bg-dark">
          <Container>
            <Navbar.Brand as={Link} to={getRoutes.chatPage()} className="text-warning">
              {t('chat.logo')}
            </Navbar.Brand>
            {
              user && <Button variant="warning" onClick={signOut}>{t('signOut')}</Button>
            }
          </Container>
        </Navbar>
        <Routes>
          <Route
            exact
            path={getRoutes.chatPage()}
            element={(
              user ? <Chat /> : <Navigate to={getRoutes.signInPagePath()} />
            )}
          />
          <Route path={getRoutes.signInPagePath()} element={<SignIn />} />
          <Route path={getRoutes.signUpPagePath()} element={<SignUp />} />
          <Route path={getRoutes.missingPagePath()} element={<MissingPage />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
