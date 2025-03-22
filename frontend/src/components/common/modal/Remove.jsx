import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeChannel } from '../../../slices/fetchData';
import { useTranslation } from 'react-i18next';

const Remove = ({ show, handleClose, channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = async () => {
    if (channel) {
      setIsDeleting(true);
      try {
        await dispatch(removeChannel(channel.id)).unwrap();
        handleClose();
      } catch (error) {
        console.error("Ошибка удаления канала:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('ui.proof')} <strong>{channel?.name}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
          {t('buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove} disabled={isDeleting}>
          {isDeleting ? `${t('buttons.remove')}...` : t('buttons.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;