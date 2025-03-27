import { useSelector } from 'react-redux';
import { selectors as modalSelectors } from '../../../slices/modalSlice.js';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const ModalController = ({ handleClose }) => {
  const type = useSelector(modalSelectors.getModalType);
  const context = useSelector(modalSelectors.getModalContext);
  const isOpen = useSelector(modalSelectors.isModalOpen);

  if (!isOpen) return null;

  switch (type) {
    case 'addChannel':
      return <Add show handleClose={handleClose} />;
    case 'removeChannel':
      return <Remove show handleClose={handleClose} channel={context} />;
    case 'renameChannel':
      return <Rename show handleClose={handleClose} channel={context} />;
    default:
      return null;
  }
};

export default ModalController;
