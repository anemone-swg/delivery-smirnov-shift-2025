import React from "react";
import { useTheme } from "@/context/ThemeContext.jsx";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import styles from "@/styles/modules/NavbarBtns.module.scss";

const NavbarThemeBtn = () => {
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
