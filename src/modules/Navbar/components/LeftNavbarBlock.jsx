import React from "react";
import styles from "@/modules/Navbar/Navbar.module.scss";
import NavbarBtn from "@/ui/NavbarBtn.jsx";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegClock, FaRegUser } from "react-icons/fa";

const LeftNavbarBlock = () => {
  return (
    <div className={styles.navbar__btnBlock}>
      <NavbarBtn
        to={"/maindeliverypage"}
        label={"ШИФТ Delivery"}
        icon={<TbTruckDelivery />}
      />
      <NavbarBtn to={"/"} label={"Профиль"} icon={<FaRegUser />} />
      <NavbarBtn to={"/"} label={"История"} icon={<FaRegClock />} />
    </div>
  );
};

export default LeftNavbarBlock;
