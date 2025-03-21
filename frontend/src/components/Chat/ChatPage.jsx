import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Channels from "./chatComponents/Channels";
import MessagesList from "./chatComponents/MessagesList";
import useAuth from "../../hooks/useAuth";
import BuildPage from "../NotFound/NotFoundPage";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useAuth();
  const { channels, messages, loading, error } = useSelector(state => state.channels);


  return loggedIn ? (
    <Container fluid className="h-100 my-4">
      <Row className="h-100 bg-light rounded shadow">
        <Channels />

        <MessagesList messages={messages} />
      </Row>
    </Container>
  ) : (
    BuildPage("Перейти на страницу входа", "/login")
  );
};

export default ChatPage;