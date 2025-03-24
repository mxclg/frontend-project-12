import React, { useEffect, useContext } from 'react';
import { customSelectors, changeChannel } from '../../../slices/channelsSlice';
import { Button, Col, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Add, Remove, Rename } from '../../common/modal';
import { useSelector, useDispatch } from 'react-redux';
import { actions as modalActions, selectors as modalSelectors } from '../../../slices/modalSlice';
import { fetchChannels } from '../../../slices/fetchData';
import { useTranslation } from 'react-i18next';
import FilterContext from '../../../contexts/FilterContext.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const { clean } = useContext(FilterContext);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.channels.loading);
  const error = useSelector(state => state.channels.error);
  const channels = useSelector(customSelectors.allChannels);

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
    <Col xs={4} md={2} className="col-4 col-md-2 border-end px-0 bg-light d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5>{t('ui.channels')}</h5>
        <Button onClick={() => handleOpenModal('addChannel')} variant="outline-primary">
          {t('ui.addChannel')}
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
              <li key={channel.id} className="p-2 d-flex justify-content-between align-items-center">
                <Button
                  variant="link"
                  className="w-100 text-start"
                  onClick={() => {
                    dispatch(changeChannel(channel.id));
                  }}
                >
                  # {clean(channel.name)}
                </Button>
                {!isSystemChannel(channel) && (
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle split variant="light" id={`dropdown-${channel.id}`} />
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