import React, { useState, useEffect, useRef } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../slices/messagesSlice";
import { fetchMessages } from '../../../slices/fetchData';
import { io } from "socket.io-client";

const MessagesForm = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
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
  }, [currentChannelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      setIsSending(true);
      const newMessage = {
        body: message,
        username: "Вы",
        channelId: currentChannelId
      };
  
      try {
        const token = JSON.parse(localStorage.getItem('userId')).token;
        const response = await fetch('/api/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newMessage),
        });
        
        const data = await response.json();
        console.log("Ответ сервера:", data);
        
        dispatch(sendMessage(data)); // Обновляем Redux
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
      } finally {
        setIsSending(false);
      }
  
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
          disabled={isSending} // Блокируем инпут во время отправки
        />
        <Button type="submit" variant="primary" disabled={isSending || !message.trim()}>
          {isSending ? "Отправка..." : "Отправить"}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessagesForm;