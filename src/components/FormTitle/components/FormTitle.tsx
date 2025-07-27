import React from "react";
import styles from "./FormTitle.module.scss";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { IoIosArrowBack } from "react-icons/io";
import { IconType } from "react-icons";

interface FormTitleProps {
  title: string;
  icon?: IconType;
  route?: string;
  onClick?: () => void;
}

const FormTitle = ({
  title,
  icon: Icon = IoIosArrowBack,
  route,
  onClick,
}: FormTitleProps) => {
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

export default FormTitle;
