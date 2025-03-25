import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../routes/routes';
import notFoundImage from '../../assets/404-page.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12 col-md-6 text-center">
        <img
  src={notFoundImage}
  alt="Страница не найдена"
  className="img-fluid"
  style={{ maxHeight: '440px' }}
/>
          <h1 className="h4 text-muted mt-4">{t('ui.notFoundPage')}</h1>
          <p className="text-muted">
            {t('ui.goTo')} <Link to={routes.chatPage()}>{t('ui.mainPage')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;