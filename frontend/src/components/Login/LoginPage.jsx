import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../common/LogoutButton";

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { loggedIn, logIn } = useAuth();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post("/api/v1/login", values);
        localStorage.setItem("userId", JSON.stringify(response.data));
        logIn();
        navigate("/");
      } catch (error) {
        formik.setSubmitting(false);
        if (error.response && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
   <div className="d-flex align-items-center justify-content-center vh-100">
   <div className="container mt-5">
     <h1>Вход</h1>
     {loggedIn ? (
       <LogoutButton />
     ) : (
       <Form onSubmit={formik.handleSubmit} className="p-3">
         <fieldset>
           <Form.Group>
             <Form.Label htmlFor="username">Имя пользователя</Form.Label>
             <Form.Control
               type="text"
               name="username"
               id="username"
               autoComplete="username"
               ref={inputRef}
               onChange={formik.handleChange}
               value={formik.values.username}
               isInvalid={authFailed}
               required
             />
           </Form.Group>
 
           <Form.Group>
             <Form.Label htmlFor="password">Пароль</Form.Label>
             <Form.Control
               type="password"
               name="password"
               id="password"
               autoComplete="current-password"
               onChange={formik.handleChange}
               value={formik.values.password}
               isInvalid={authFailed}
               required
             />
             {authFailed && (
               <div className="invalid-feedback d-block">
                 Неверные имя пользователя или пароль
               </div>
             )}
           </Form.Group>
 
           <Button type="submit" variant="primary" className="mt-3">
             Войти
           </Button>
         </fieldset>
       </Form>
     )}
   </div>
 </div>
  );
};

export default LoginPage;
