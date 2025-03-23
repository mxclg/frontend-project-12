import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NotFoundPage from "./NotFound/NotFoundPage";
import ChatPage from "./Chat/ChatPage";
import LoginPage from "./Login/LoginPage";
import SignUpPage from "./SignUp/SignUpPage";
import Nav from './common/Nav';
import useAuth from "../hooks/useAuth";
import routes from "../routes/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// 🔧 Rollbar
import { ErrorBoundary } from '@rollbar/react';

const AuthWrapper = ({ children }) => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (!token) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return children;
};

function App() {
  return (
    <ErrorBoundary> {/* 🔧 отлавливаем ошибки всего приложения */}
      <Router>
        <Nav />
        <Routes>
          <Route path={routes.chatPage()} element={<AuthWrapper><ChatPage /></AuthWrapper>} />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signUpPage()} element={<SignUpPage />} />
          <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;