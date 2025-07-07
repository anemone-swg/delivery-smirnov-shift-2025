import React from "react";
import styles from "./Navbar.module.scss";
import RightNavbarBlock from "@/modules/Navbar/components/RightNavbarBlock.jsx";
import LeftNavbarBlock from "@/modules/Navbar/components/LeftNavbarBlock.jsx";

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <LeftNavbarBlock />
        <RightNavbarBlock />
      </nav>
      <hr className={styles.navbar__hr} />
    </>
  );
};

export default Navbar;
