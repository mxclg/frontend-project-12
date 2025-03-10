import { Link } from "react-router-dom";

const BuildPage = (title, linkText, linkTo) => (
  <>
    <h1>{title}</h1>
    {linkText && linkTo && <Link to={linkTo}>{linkText}</Link>}
  </>
);

export default BuildPage;

export const NotFoundPage = () => BuildPage("Ошибка 404 - Страница не найдена", "Вернуться на главную", "/");