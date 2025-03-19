import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { renameChannel } from '../../../slices/fetchData';

const Rename = ({ show, handleClose, channel }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .required('Обязательное поле'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (channel) {
      try {
        await dispatch(renameChannel({ id: channel.id, name: values.name })).unwrap();
        handleClose();
      } catch (error) {
        console.error("Ошибка при переименовании канала:", error);
      }
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: channel?.name || '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group>
                <Form.Label htmlFor="name">Новое имя</Form.Label>
                <Field
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Введите новое имя"
                  innerRef={inputRef} // ✅ Автофокус
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Отмена
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                Сохранить
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default Rename;