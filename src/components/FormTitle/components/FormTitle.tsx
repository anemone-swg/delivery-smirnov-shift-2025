import React, {JSX} from "react";
import styles from "./FormTitle.module.scss";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {IoIosArrowBack} from "react-icons/io";
import {IconType} from "react-icons";

/**
 * Props компонента FormTitle.
 *
 * @property {string} title - Заголовок формы.
 * @property {IconType} [icon] - Иконка заголовка.
 * @property {string} [route] - Маршрут навигации.
 * @property {()=>void} [onClick] - Действие при клике.
 * */
export interface FormTitleProps {
  title: string;
  icon?: IconType;
  route?: string;
  onClick?: () => void;
}

/**
 * React-компонент, отображающий заголовок формы.
 *
 * @param {FormTitleProps} props - Props компонента.
 * @returns {JSX.Element} JSX-элемент заголовка формы.
 * */
const FormTitle = ({
  title,
  icon: Icon = IoIosArrowBack,
  route,
  onClick,
}: FormTitleProps): JSX.Element => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <>
      {!isMobile && <p className={styles.formTitle__header}>{title}</p>}
      {isMobile && (
        <div className={styles.formTitle__mobileHeader}>
          <button onClick={handleClick}>
            <Icon size={24} />
          </button>
          <p className={styles.formTitle__header}>{title}</p>
        </div>
      )}
    </>
  );
};

export default React.memo(FormTitle) as typeof FormTitle;
