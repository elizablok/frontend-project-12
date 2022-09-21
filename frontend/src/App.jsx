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
import SignInForm from './components/pages/signIn/SignInForm.jsx';
import MissingPage from './components/pages/404.jsx';
import Chat from './components/pages/chat/Chat.jsx';
import getRoutes from './routes.js';
import { useAuth } from './contexts/AuthProvider';

const App = () => {
  const { t } = useTranslation();

  const RequireAuth = ({ children }) => {
    const { user } = useAuth();

    return (
      user ? children : <Navigate to={getRoutes.signInPagePath()} />
    );
  };

  const AuthButton = () => {
    const { user, signOut } = useAuth();
    const { t } = useTranslation();

    if (user) {
      return <Button variant="warning" onClick={signOut}>{t('signOut')}</Button>;
    }
    return null;
  };

  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar className="p-2 mb-2 bg-dark">
          <Container>
            <Navbar.Brand as={Link} to={getRoutes.chatPage()} className="text-warning">
              {t('chatLogo')}
            </Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
        <Routes>
          <Route
            exact
            path={getRoutes.chatPage()}
            element={(
              <RequireAuth>
                <Chat />
              </RequireAuth>
            )}
          />
          <Route path={getRoutes.signInPagePath()} element={<SignInForm />} />
          <Route path={getRoutes.missingPagePath()} element={<MissingPage />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
