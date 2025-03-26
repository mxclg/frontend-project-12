import React, { useEffect, useContext } from 'react';
import { customSelectors, changeChannel } from '../../../slices/channelsSlice';
import { Button, Col, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Add, Remove, Rename } from '../../common/modal';
import { useSelector, useDispatch } from 'react-redux';
import { actions as modalActions, selectors as modalSelectors } from '../../../slices/modalSlice';
import { fetchChannels } from '../../../slices/fetchData';
import { useTranslation } from 'react-i18next';
import FilterContext from '../../../contexts/FilterContext.js';

const Channels = () => {
  const { t } = useTranslation();
  const { clean } = useContext(FilterContext);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.channels.loading);
  const error = useSelector(state => state.channels.error);
  const channels = useSelector(customSelectors.allChannels);
  const currentChannelId = useSelector(state => state.channels.currentChannelId);

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

  const handleOpenRemoveModal = (channel) => handleOpenModal('removeChannel', channel);
  const handleOpenRenameModal = (channel) => {
    handleOpenModal('renameChannel', channel);
  };

  const isSystemChannel = (channel) => ['general', 'random'].includes(channel.name);

  return (
    <Col className="col-4 col-md-2 border-end px-0 flex-column h-100 d-flex bg-light">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('ui.channels')}</b>
        <Button className="p-0 text-primary" variant="group-vertical" onClick={() => handleOpenModal('addChannel')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <div className="overflow-auto flex-grow-1">
        {loading ? (
          <p>{t('ui.loadingChannels')}</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{t('errors.unknown')}</p>
        ) : (
          <ul className="list-unstyled">
            {channels.map(channel => (
              <li key={channel.id} className="nav-item w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                    className={`w-100 rounded-0 text-start text-truncate ${channel.id === currentChannelId ? 'btn' : ''}`}
                    onClick={() => dispatch(changeChannel(channel.id))}
                  >
                    # {clean(channel.name)}
                  </Button>
                  {!isSystemChannel(channel) && (
                    <Dropdown as={ButtonGroup}>
                      
                      <Dropdown.Toggle
                          split
                          id={`dropdown-${channel.id}`}
                          variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                          className="rounded-0 border-start-0"
                          >
                          <span className="visually-hidden">{t('buttons.channelManagement')}</span>
                        </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleOpenRenameModal(channel)}>
                          {t('buttons.rename')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleOpenRemoveModal(channel)}>
                          {t('buttons.remove')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
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