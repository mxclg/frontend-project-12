

import React from "react";

const MessagesBody = ({ messages }) => {
  return (
    <div className="flex-grow-1 bg-light p-4">
      {messages.length === 0 ? (
        <p>Нет сообщений</p>
      ) : (
        <ul className="list-unstyled">
          {messages.map(({ id, body, username }) => (
            <li key={id} className="mb-2">
              <strong>{username}:</strong> {body}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesBody;