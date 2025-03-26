import React, { useRef, useEffect, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { renameChannel } from '../../../slices/fetchData';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import FilterContext from '../../../contexts/FilterContext.js';

const Rename = ({ show, handleClose, channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { clean } = useContext(FilterContext);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('errors.rangeLetter'))
      .max(20, t('errors.rangeLetter'))
      .required(t('errors.required')),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (channel) {
      try {
        await dispatch(renameChannel({ id: channel.id, name: values.name })).unwrap();
        toast.success(t('notify.renamedChannel'));
        handleClose();
      } catch (error) {
        console.error("Ошибка при переименовании канала:", error);
        toast.error(t('notify.networkError'));
      }
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: channel ? clean(channel.name) : '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group>
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

export default Rename;