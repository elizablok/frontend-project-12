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
import SignInForm from './components/pages/signIn/SignInForm.jsx';
import MissingPage from './components/pages/404.jsx';
import Chat from './components/pages/chat/Chat.jsx';
import routes from './routes.js';

const App = () => {
  const { t } = useTranslation();

  const RequireAuth = () => null;

  const AuthButton = () => null;

  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar className="p-2 mb-2 bg-dark">
          <Container>
            <Navbar.Brand as={Link} to={routes.chatPage()} className="text-warning">
              {t('chatLogo')}
            </Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
        <Routes>
          <Route
            exact
            path={routes.chatPage()}
            element={(
              <RequireAuth>
                <Chat />
              </RequireAuth>
            )}
          />
          <Route path={routes.signInPagePath()} element={<SignInForm />} />
          <Route path={routes.missingPagePath()} element={<MissingPage />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
