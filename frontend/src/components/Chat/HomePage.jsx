import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "../../slices/channelsSlice";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../common/LogoutButton";
import BuildPage from "../NotFound/Pages";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useAuth();
  const { channels, loading, error } = useSelector(state => state.channels);

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchChannels());
    }
  }, [loggedIn, dispatch]);

  return loggedIn ? (
    <Container fluid className="h-100 my-4">
      <Row className="h-100 bg-light rounded shadow">
        {/* Каналы */}
        <Col xs={4} md={2} className="border-end p-0 bg-light d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center p-4">
            <h5>Каналы</h5>
            <Button
              onClick={() => alert("Добавить новый канал")} // Placeholder для действия
              variant="outline-primary"
            >
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
                  <li key={channel.id} className="p-2">
                    <Button variant="link" className="w-100 text-start">
                      #{channel.name}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Col>

        {/* Чат и сообщения */}
        <Col className="p-0">
          <div className="d-flex flex-column h-100">
            <div className="bg-white p-3 shadow-sm mb-4">
              <h6>Выберите канал</h6>
            </div>
            <div className="flex-grow-1 bg-light p-4">
              <h6>Сообщения</h6>
              {/* Здесь будут отображаться сообщения */}
            </div>

            {/* Поле для ввода нового сообщения */}
            <div className="p-4 bg-white shadow-sm">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Введите сообщение..." 
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Кнопка выхода */}
      <div className="d-flex justify-content-end mt-3">
        <LogoutButton />
      </div>
    </Container>
  ) : (
    BuildPage("Здесь будет чат Hexlet!", "Перейти на страницу входа", "/login")
  );
};

export default HomePage;