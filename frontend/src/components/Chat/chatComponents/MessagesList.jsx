import React from "react";
import { useSelector } from "react-redux";
import MessagesForm from "./MessagesForm";
import { Col } from "react-bootstrap";
import MessagesBody from "./MessagesBody";
import MessagesHeader from "./MessagesHeader";

const MessagesList = () => {
  const messages = useSelector((state) => state.messages.messages);

  return (
    <Col className="p-0">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
        <MessagesBody messages={messages} />
        <MessagesForm />
      </div>
    </Col>
  );
};

export default MessagesList;