import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Channels from "./chatComponents/Channels";
import MessagesList from "./chatComponents/MessagesList";
import useAuth from "../../hooks/useAuth";
import NotFoundPage from "../NotFound/NotFoundPage";
import { selectors as loadingSelectors, stateLoad } from '../../slices/loadingStateSlice';

const ChatPage = () => {
  const { loggedIn } = useAuth();
  const status = useSelector(loadingSelectors.getStatus);
  const { t } = useTranslation();

  useEffect(() => {
    if (status === stateLoad.fail || status === stateLoad.error) {
      toast.error(t('notify.unauthorized'));
    }
  }, [status, t]);

  if (!loggedIn) {
    return <NotFoundPage />;
  }

  return (
    <Container fluid className="h-100 my-4">
      <Row className="h-100 bg-light rounded shadow">
        <Channels />
        <MessagesList />
      </Row>
    </Container>
  );
};

export default ChatPage;