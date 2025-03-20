import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessagesForm from "./MessagesForm";
import { Col } from "react-bootstrap";
import MessagesBody from "./MessagesBody";
import MessagesHeader from "./MessagesHeader";
import { fetchMessages } from "../../../slices/fetchData";
import { customSelectors } from "../../../slices/messagesSlice";

const MessagesList = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(state => state.channels.currentChannelId);
  const messages = useSelector(customSelectors.currentChannelMessages);

  useEffect(() => {
    if (currentChannelId) {
      console.log("Fetching messages for channel:", currentChannelId);
      dispatch(fetchMessages(currentChannelId)); // Передаём currentChannelId
    }
  }, [dispatch, currentChannelId]);

  console.log("Рендеринг сообщений:", messages);
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