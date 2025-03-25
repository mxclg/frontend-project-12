import { Form, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../common/LogoutButton";
import routes from "../../routes/routes";
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { loggedIn, logIn } = useAuth();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        const response = await axios.post("/api/v1/login", values);
        logIn(response.data);
        navigate("/");
      } catch (error) {
        setSubmitting(false);
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
    <div className="container-fluid h-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center align-content-center h-100 w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">{t('buttons.logIn')}</h1>
              {loggedIn ? (
                <LogoutButton />
              ) : (
                <Form onSubmit={formik.handleSubmit} className="w-100">
                  <div className="form-floating mb-3">
                    <Form.Control
                      type="text"
                      name="username"
                      id="username"
                      placeholder={t('fields.username')}
                      autoComplete="username"
                      ref={inputRef}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Label htmlFor="username">{t('fields.username')}</Form.Label>
                  </div>
  
                  <div className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      placeholder={t('fields.password')}
                      autoComplete="current-password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Label htmlFor="password">{t('fields.password')}</Form.Label>
                    {authFailed && (
                      <div className="invalid-feedback d-block">
                        {t('errors.incorrect')}
                      </div>
                    )}
                  </div>
  
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? `${t('buttons.logIn')}...` : t('buttons.logIn')}
                  </Button>
                </Form>
              )}
            </div>
          </div>
          <div className="text-center mt-3">
            <span>{t('ui.noAccount')}</span> <Link to={routes.signUpPage()}>{t('ui.registration')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;