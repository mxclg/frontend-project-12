import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { customSelectors } from "../../../slices/messagesSlice";
import { useTranslation } from "react-i18next";
import FilterContext from "../../../contexts/FilterContext.jsx";

const MessagesBody = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => customSelectors.currentChannelMessages(state));
  const { clean } = useContext(FilterContext);

  return (
    <div className="chat-messages overflow-auto px-5 py-3 flex-grow-1">
  {messages.length === 0 ? (
    <p>{t('ui.noMessages')}</p>
  ) : (
    <ul className="list-unstyled">
      {messages.map(({ id, body, username }) => (
        <li key={`${id}-${username}-${body.slice(0, 5)}`} className="mb-2">
          <strong className="me-1">{username}:</strong> {clean(body)}
        </li>
      ))}
    </ul>
  )}
</div>
  );
};

export default MessagesBody;
