import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NotFoundPage from "./NotFound/NotFoundPage";
import ChatPage from "./Chat/ChatPage";
import LoginPage from "./Login/LoginPage";
import SignUpPage from "./SignUp/SignUpPage";
import Nav from './common/Nav';
import { AuthProvider } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";
import routes from "../routes/routes";

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
      <Router>
        <Nav />
        <Routes>
          <Route path={routes.chatPage()} element={<AuthWrapper><ChatPage /></AuthWrapper>} />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signUpPage()} element={<SignUpPage />} />
          <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
        </Routes>
      </Router>
  );
}

export default App;
