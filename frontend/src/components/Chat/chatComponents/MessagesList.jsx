import React, { useState } from "react";
import MessagesForm from "./MessagesForm";
import { Col } from "react-bootstrap";
import MessagesBody from "./MessagesBody";
import MessagesHeader from "./MessagesHeader";

const MessagesList = ({ messages }) => {
  const [localMessages, setLocalMessages] = useState(messages || []);

  const handleSendMessage = (msg) => {
    const newMessage = { id: localMessages.length + 1, body: msg, username: "Вы" };
    setLocalMessages([...localMessages, newMessage]);
  };

  return (
    <Col className="p-0">
      <div className="d-flex flex-column h-100">
      <MessagesHeader />
        <MessagesBody messages={localMessages} />
        <MessagesForm onSendMessage={handleSendMessage} />
      </div>
    </Col>
  );
};

export default MessagesList;