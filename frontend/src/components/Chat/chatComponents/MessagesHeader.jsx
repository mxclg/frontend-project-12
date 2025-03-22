import React from "react";
import { useTranslation } from "react-i18next";

const MessagesHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-3 shadow-sm mb-4">
      <h6>{t('ui.selectChannel')}</h6>
    </div>
  );
};

export default MessagesHeader;