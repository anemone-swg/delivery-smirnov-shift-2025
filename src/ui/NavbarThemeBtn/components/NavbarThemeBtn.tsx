import React, { JSX } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import styles from "@/styles/modules/NavbarBtns.module.scss";

/**
 * Кнопка переключения темы приложения (светлая/тёмная).
 * Отображает иконку в зависимости от текущей темы.
 * При клике переключает тему.
 *
 * @component
 * @returns {JSX.Element} JSX-элемент кнопки для переключения темы
 */
const NavbarThemeBtn = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.navbarBtn}>
      <span className={styles.navbarBtn__icon}>
        {theme === "light" ? <FaRegSun /> : <FaRegMoon />}
      </span>
    </button>
  );
};

export default NavbarThemeBtn;
