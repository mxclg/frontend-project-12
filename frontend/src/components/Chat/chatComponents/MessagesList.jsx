import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessagesForm from "./MessagesForm";
import { Col } from "react-bootstrap";
import MessagesBody from "./MessagesBody";
import MessagesHeader from "./MessagesHeader";
import { fetchMessages } from "../../../slices/fetchData";

const MessagesList = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(state => state.channels.currentChannelId);

  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchMessages(currentChannelId));
    }
  }, [dispatch, currentChannelId]);

  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
        <MessagesBody />
        <MessagesForm />
      </div>
    </Col>
  );
};

export default MessagesList;