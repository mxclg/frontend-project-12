import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from '@rollbar/react';
import NotFoundPage from './NotFound/NotFoundPage';
import ChatPage from './Chat/ChatPage';
import LoginPage from './Login/LoginPage';
import SignUpPage from './SignUp/SignUpPage';
import Nav from './common/Nav';
import PrivateRoute from './common/PrivateRoute';
import routes from '../routes/routes';

const App = () => (
  <ErrorBoundary>
    {' '}
    <Router>
      <div className="h-100 d-flex flex-column">
        <Nav />
        <Routes>
          <Route
            path={routes.chatPage()}
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
    )}
          />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signUpPage()} element={<SignUpPage />} />
          <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  </ErrorBoundary>
);

export default App;
