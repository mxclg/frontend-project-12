import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel, changeChannel } from '../../../slices/channelsSlice';

const Add = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const channels = useSelector((state) => state.channels.entities); // ✅ Получаем список каналов

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .required('Обязательное поле')
      .test('unique', 'Канал с таким именем уже существует', (value) =>
        !Object.values(channels).some((channel) => channel.name === value)
      ), // ✅ Проверка на дублирование имен
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const newChannel = { name: values.name };
      const response = await dispatch(addChannel(newChannel)).unwrap();
      dispatch(changeChannel(response.id));
    } catch (error) {
      console.error('Ошибка добавления канала:', error);
    }
    setSubmitting(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Formik initialValues={{ name: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group>
                <Form.Label htmlFor="name">Имя канала</Form.Label>
                <Field id="name" name="name" className="form-control" placeholder="Введите имя канала" innerRef={inputRef} />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Отмена
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                Добавить
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default Add;