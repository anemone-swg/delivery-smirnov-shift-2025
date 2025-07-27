import React from "react";
import { NavLink } from "react-router-dom";
import styles from "@/styles/modules/NavbarBtns.module.scss";
import { IconType } from "react-icons";

interface NavbarBtnProps {
  to: string;
  label: string;
  icon: IconType;
}

const NavbarBtn = ({ to, label, icon: Icon }: NavbarBtnProps) => (
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
