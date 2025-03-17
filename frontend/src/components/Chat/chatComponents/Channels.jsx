import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Button, Col, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Add, Remove, Rename } from '../../common/modal';
import { useSelector } from 'react-redux';
import { actions as modalActions, selectors as modalSelectors } from '../../../slices/modalSlice';
import { customSelectors } from '../../../slices/channelsSlice';
import { fetchChannels } from '../../../slices/fetchData';
import { useDispatch } from 'react-redux';

const Channels = () => {
  const channels = useSelector(customSelectors.allChannels);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.channels.loading);
  const error = useSelector(state => state.channels.error);

  useEffect(() => {
  }, [channels]);

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);


  const isModalOpen = useSelector(modalSelectors.isModalOpen);
  const modalType = useSelector(modalSelectors.getModalType);
  const modalContext = useSelector(modalSelectors.getModalContext);

  const handleOpenModal = (type, context = null) => {
    dispatch(modalActions.open({ type, context }));
  };

  const handleCloseModal = () => {
    dispatch(modalActions.close());
  };

  const handleAddChannel = () => {
  handleOpenModal('addChannel');
  };
  
  const handleOpenRemoveModal = (channel) => handleOpenModal('removeChannel', channel);
  const handleOpenRenameModal = (channel) => handleOpenModal('renameChannel', channel);

  const isSystemChannel = (channel) => ['general', 'random'].includes(channel.name);

  return (
    <Col xs={4} md={2} className="border-end p-0 bg-light d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center p-4">
        <h5>Каналы</h5>
        <Button onClick={handleAddChannel} variant="outline-primary">
          Добавить
        </Button>
      </div>
      <div className="overflow-auto flex-grow-1">
        {loading ? (
          <p>Загружаем каналы...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Ошибка загрузки: {error}</p>
        ) : (
          <ul className="list-unstyled">
            {channels.map(channel => (
              <li key={channel.id} className="p-2 d-flex justify-content-between align-items-center">
                <Button variant="link" className="w-100 text-start">
                  #{channel.name}
                </Button>
                {!isSystemChannel(channel) && (
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle split variant="light" id={`dropdown-${channel.id}`} />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleOpenRenameModal(channel)}>Переименовать</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleOpenRemoveModal(channel)}>Удалить</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Add show={isModalOpen && modalType === 'addChannel'} handleClose={handleCloseModal} />
      <Remove show={isModalOpen && modalType === 'removeChannel'} handleClose={handleCloseModal} channel={modalContext} />
      <Rename show={isModalOpen && modalType === 'renameChannel'} handleClose={handleCloseModal} channel={modalContext} />
    </Col>
  );
};

export default Channels;
