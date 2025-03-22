import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel, changeChannel } from '../../../slices/channelsSlice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Add = ({ show, handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const channels = useSelector((state) => state.channels.entities);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('errors.rangeLetter'))
      .max(20, t('errors.rangeLetter'))
      .required(t('errors.required'))
      .test('unique', t('errors.notOneOf'), (value) =>
        !Object.values(channels).some((channel) => channel.name === value)
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const newChannel = { name: values.name };
      const response = await dispatch(addChannel(newChannel)).unwrap();
      dispatch(changeChannel(response.id));
      toast.success(t('notify.createdChannel'));
    } catch (error) {
      console.error('Ошибка добавления канала:', error);
      toast.error(t('notify.networkError'));
    }
    setSubmitting(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.addChannel')}</Modal.Title>
      </Modal.Header>
      <Formik initialValues={{ name: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group>
                <Form.Label htmlFor="name">{t('ui.nameChannel')}</Form.Label>
                <Field
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder={t('ui.nameChannel')}
                  innerRef={inputRef}
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {t('buttons.submit')}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default Add;