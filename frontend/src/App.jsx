import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  Navbar,
  Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import SignIn from './components/pages/signIn/SignIn';
import SignUp from './components/pages/signUp/SignUp';
import MissingPage from './components/pages/404';
import Chat from './components/pages/chat/Chat';
import getRoutes from './routes';
import AuthnButton from './components/AuthnButton';
import RequireAuthn from './components/RequireAuthn';
import 'react-toastify/scss/main.scss';

const App = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar className="p-2 mb-2 bg-dark">
          <Container>
            <Navbar.Brand as={Link} to={getRoutes.chatPage()} className="text-warning">
              {t('chat.logo')}
            </Navbar.Brand>
            <AuthnButton />
          </Container>
        </Navbar>
        <Routes>
          <Route
            exact
            path={getRoutes.chatPage()}
            element={(
              <RequireAuthn>
                <Chat />
              </RequireAuthn>
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
