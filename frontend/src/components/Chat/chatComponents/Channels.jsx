import React from 'react';
import { Button, Col } from 'react-bootstrap';

const Channels = ({ channels, loading, error, handleAddChannel }) => (
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
);

export default Channels;
