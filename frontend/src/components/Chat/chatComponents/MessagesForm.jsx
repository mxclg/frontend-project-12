import React, { useState, useEffect, useRef } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../slices/messagesSlice";
import { fetchMessages } from '../../../slices/fetchData';
import { io } from "socket.io-client";

const MessagesForm = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const [socket, setSocket] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchMessages(currentChannelId));
    }
  }, [dispatch, currentChannelId]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
          ref={inputRef}
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