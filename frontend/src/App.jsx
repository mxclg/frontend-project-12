import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NotFoundPage } from "./components/NotFound/Pages";
import HomePage from "./components/Chat/HomePage";
import LoginPage from "./components/Login/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import useAuth from "./hooks/useAuth";
import routes from "./routes/routes";

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
   <AuthProvider>
     <Router>
       <Routes>
         <Route path={routes.homePage()} element={<AuthWrapper><HomePage /></AuthWrapper>} />
         <Route path={routes.loginPage()} element={<LoginPage />} />
         <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
       </Routes>
     </Router>
   </AuthProvider>
 );
}

export default App;
