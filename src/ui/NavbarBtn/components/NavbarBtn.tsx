import React, { JSX } from "react";
import { NavLink } from "react-router-dom";
import styles from "@/styles/modules/NavbarBtns.module.scss";
import { IconType } from "react-icons";

/**
 * Props компонента NavbarBtn.
 *
 * @property {string} to - Маршрут навигации.
 * @property {string} label - Название кнопки.
 * @property {IconType} icon - Иконка.
 */
export interface NavbarBtnProps {
  to: string;
  label: string;
  icon: IconType;
}

/**
 * React-компонент, отображающий кнопку навигационной панели.
 *
 * @component
 * @param {NavbarBtnProps} props - Props компонента.
 * @returns {JSX.Element} JSX-элемент кнопки навигационной панели.
 */
const NavbarBtn = ({ to, label, icon: Icon }: NavbarBtnProps): JSX.Element => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? `${styles.navbarBtn} ${styles["navbarBtn--active"]}`
        : styles.navbarBtn
    }
  >
    <span className={styles.navbarBtn__icon}>{<Icon />}</span>
    <span className={styles.navbarBtn__label}>{label}</span>
  </NavLink>
);

export default NavbarBtn;
