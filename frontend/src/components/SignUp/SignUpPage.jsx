import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Card, Image, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes/routes';
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('errors.rangeLetter'))
      .max(20, t('errors.rangeLetter'))
      .required(t('errors.required')),
    password: yup
      .string()
      .min(6, t('errors.minLetter'))
      .required(t('errors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('errors.checkPassword'))
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setAuthFailed(false);
      formik.setSubmitting(true);
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        });
        auth.logIn(response.data);
        navigate(routes.chatPage());
      } catch (err) {
        console.error('Ошибка при регистрации:', err);
        formik.setSubmitting(false);
        if (err.response?.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center align-content-center h-100 w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">{t('ui.registration')}</h1>
              <Form onSubmit={formik.handleSubmit} className="w-100">
                <div className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    placeholder={t('fields.username')}
                    autoComplete="username"
                    required
                    ref={inputRef}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.errors.username || authFailed}
                  />
                  <Form.Label htmlFor="username">{t('fields.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username || (authFailed && t('errors.alreadyExists'))}
                  </Form.Control.Feedback>
                </div>
  
                <div className="form-floating mb-3">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t('fields.password')}
                    autoComplete="new-password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.errors.password}
                  />
                  <Form.Label htmlFor="password">{t('fields.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </div>
  
                <div className="form-floating mb-4">
                  <Form.Control
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder={t('fields.confirmPassword')}
                    autoComplete="new-password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.errors.confirmPassword}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('fields.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </div>
  
                <Button type="submit" variant="outline-primary" className="w-100" disabled={formik.isSubmitting}>
  {t('buttons.register')}
</Button>
              </Form>
            </Card.Body>
            {/* <Card.Footer className="p-4 text-center bg-light border-top">
              <span>{t('ui.haveAccount')}</span> <a href={routes.loginPage()}>{t('buttons.logIn')}</a>
            </Card.Footer> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;