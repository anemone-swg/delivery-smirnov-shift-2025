import React from "react";
import styles from "./Navbar.module.scss";
import { NavbarBtn } from "@/ui/NavbarBtn";
import { NavbarThemeBtn } from "@/ui/NavbarThemeBtn";
import PATHS from "@/constants/paths.js";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegClock, FaRegUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const Navbar = () => (
  <>
    <nav className={styles.navbar}>
      <div className={styles.navbar__btnBlock}>
        <NavbarBtn
          to={PATHS.MAIN}
          label={"ШИФТ Delivery"}
          icon={<TbTruckDelivery />}
        />
        <NavbarBtn to={"/"} label={"Профиль"} icon={<FaRegUser />} />
        <NavbarBtn to={"/"} label={"История"} icon={<FaRegClock />} />
      </div>
      <div className={styles.navbar__btnBlock}>
        <NavbarBtn to={"/"} label={"Выйти"} icon={<IoMdExit />} />
        <NavbarThemeBtn />
      </div>
    </nav>
    <hr className={styles.navbar__hr} />
  </>
);

export default Navbar;
