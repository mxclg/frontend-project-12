import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../routes/routes';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center pt-5">
      <h1 className="h4 text-muted mt-3">{t('ui.notFoundPage')}</h1>
      <p className="text-muted">
        {t('ui.goTo')} <Link to={routes.chatPage()}>{t('ui.mainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;