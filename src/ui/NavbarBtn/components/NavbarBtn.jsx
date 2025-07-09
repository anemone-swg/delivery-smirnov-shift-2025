import React from "react";
import { NavLink } from "react-router-dom";
import styles from "@/styles/modules/NavbarBtns.module.scss";

const NavbarBtn = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? `${styles.navbarBtn} ${styles["navbarBtn--active"]}`
        : styles.navbarBtn
    }
  >
    {icon && <span className={styles.navbarBtn__icon}>{icon}</span>}
    <span className={styles.navbarBtn__label}>{label}</span>
  </NavLink>
);

export default NavbarBtn;
