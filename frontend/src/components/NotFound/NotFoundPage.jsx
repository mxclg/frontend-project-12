import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="text-center">
    <h1>Ошибка 404 - Страница не найдена</h1>
    <p>
      Вернуться на <Link to="/">главную</Link>
    </p>
  </div>
);

export default NotFoundPage;