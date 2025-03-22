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
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h1 className="text-center mb-4">{t('ui.registration')}</h1>
              <Form onSubmit={formik.handleSubmit}>
                <FormGroup className="mb-3">
                  <Form.Label>{t('fields.username')}</Form.Label>
                  <Form.Control
                    ref={inputRef}
                    name="username"
                    autoComplete="username"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.errors.username || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username || (authFailed && t('errors.alreadyExists'))}
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mb-3">
                  <Form.Label>{t('fields.password')}</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mb-4">
                  <Form.Label>{t('fields.confirmPassword')}</Form.Label>
                  <Form.Control
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FormGroup>

                <Button type="submit" variant="primary" className="w-100" disabled={formik.isSubmitting}>
                  {t('buttons.register')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;