import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Card, Image, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes/routes';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Имя пользователя должно содержать от 3 до 20 символов')
    .max(20, 'Имя пользователя должно содержать от 3 до 20 символов')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
              <h1 className="text-center mb-4">Регистрация</h1>
              <Form onSubmit={formik.handleSubmit}>
              <FormGroup className="mb-3">
  <Form.Label>Имя пользователя</Form.Label>
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
    {formik.errors.username || (authFailed && 'Такой пользователь уже существует')}
  </Form.Control.Feedback>
</FormGroup>
                
                <FormGroup className="mb-3">
                  <Form.Label>Пароль</Form.Label>
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
                  <Form.Label>Подтверждение пароля</Form.Label>
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
                  Зарегистрироваться
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
