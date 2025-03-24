import React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { customSelectors } from "../../../slices/channelsSlice";
import FilterContext from "../../../contexts/FilterContext.jsx";
import { customSelectors as messagesSelectors } from "../../../slices/messagesSlice";

const MessagesHeader = () => {
  const { t } = useTranslation();
const { clean } = useContext(FilterContext);
const currentChannel = useSelector(customSelectors.currentChannel);
const messages = useSelector(messagesSelectors.currentChannelMessages);
const messageCount = messages.length;

if (!currentChannel) return null;

return (
  <div className="bg-white p-3 shadow-sm mb-4">
    <h6 className="mb-0">
  # {clean(currentChannel.name)}
</h6>
<span className="text-muted">
  {t('ui.counter.count', { count: messageCount })}
</span>
  </div>
);
};

export default MessagesHeader;