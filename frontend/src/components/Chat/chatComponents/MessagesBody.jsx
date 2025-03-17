import React from "react";
import { useSelector } from "react-redux";
import { customSelectors } from "../../../slices/messagesSlice";

const MessagesBody = () => {
  const messages = useSelector(customSelectors.allMessages);

  return (
    <div className="flex-grow-1 bg-light p-4">
      {messages.length === 0 ? (
        <p>Нет сообщений</p>
      ) : (
        <ul className="list-unstyled">
          {messages.map(({ id, body, username }) => (
            <li key={`${id}-${username}-${body.slice(0, 5)}`} className="mb-2">
              <strong>{username}:</strong> {body}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesBody;