import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NotFoundPage } from "./components/Pages";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import useAuth from "./hooks/useAuth";

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
         <Route path="/" element={<AuthWrapper><HomePage /></AuthWrapper>} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="*" element={<NotFoundPage />} />
       </Routes>
     </Router>
   </AuthProvider>
 );
}


export default App;
