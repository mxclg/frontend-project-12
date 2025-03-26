import React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { customSelectors } from "../../../slices/channelsSlice";
import FilterContext from "../../../contexts/FilterContext.js";
import { customSelectors as messagesSelectors } from "../../../slices/messagesSlice";

const MessagesHeader = () => {
const { t } = useTranslation();
const { clean } = useContext(FilterContext);
const currentChannel = useSelector(customSelectors.currentChannel);
const messages = useSelector(messagesSelectors.currentChannelMessages);
const messageCount = messages.length;

if (!currentChannel) return null;

return (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      <b># {clean(currentChannel.name)}</b>
    </p>
    <span className="text-muted">
      {t('ui.counter.count', { count: messageCount })}
    </span>
  </div>
);
};

export default MessagesHeader;