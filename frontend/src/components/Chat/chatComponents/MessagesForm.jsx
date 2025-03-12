

import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../slices/messagesSlice";
import { io } from "socket.io-client";

const MessagesForm = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      dispatch(sendMessage({ message: { body: message, username: "Вы" }, socket }));
      setMessage("");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border-top">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="primary">Отправить</Button>
      </InputGroup>
    </Form>
  );
};

export default MessagesForm;