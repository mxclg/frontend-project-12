import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import Channels from "./chatComponents/Channels";
import MessagesList from "./chatComponents/MessagesList";
import useAuth from "../../hooks/useAuth";
import BuildPage from "../NotFound/NotFoundPage";

const ChatPage = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? (
    <Container fluid className="h-100 my-4">
      <Row className="h-100 bg-light rounded shadow">
        <Channels />
        <MessagesList />
      </Row>
    </Container>
  ) : (
    BuildPage("Перейти на страницу входа", "/login")
  );
};

export default ChatPage;