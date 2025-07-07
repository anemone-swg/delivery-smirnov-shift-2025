import React from "react";
import styles from "@/modules/Navbar/Navbar.module.scss";
import NavbarBtn from "@/ui/NavbarBtn.jsx";
import { IoMdExit } from "react-icons/io";
import NavbarThemeBtn from "@/ui/NavbarThemeBtn.jsx";

const RightNavbarBlock = () => {
  return (
    <div className={styles.navbar__btnBlock}>
      <NavbarBtn to={"/"} label={"Выйти"} icon={<IoMdExit />} />
      <NavbarThemeBtn />
    </div>
  );
};

export default RightNavbarBlock;
