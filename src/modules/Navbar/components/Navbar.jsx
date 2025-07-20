import React from "react";
import styles from "@/modules/Navbar/components/Navbar.module.scss";
import { NavbarBtn } from "@/ui/NavbarBtn/index.js";
import PATHS from "@/constants/paths.js";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegClock, FaRegUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { NavbarThemeBtn } from "@/ui/NavbarThemeBtn/index.js";
import { useMediaQuery } from "react-responsive";
import { MdOutlineCalculate } from "react-icons/md";

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {isMobile ? (
        <>
          <hr className={styles.navbar__hr} />
          <nav className={styles.navbar}>
            <div className={styles.navbar__btnBlock}>
              <NavbarBtn
                to={PATHS.MAIN}
                label={"Расчет"}
                icon={<MdOutlineCalculate />}
              />
              <NavbarBtn to={"/"} label={"История"} icon={<FaRegClock />} />
              <NavbarBtn to={"/"} label={"Профиль"} icon={<FaRegUser />} />
              <NavbarThemeBtn />
            </div>
          </nav>
        </>
      ) : (
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
      )}
    </>
  );
};

export default Navbar;
