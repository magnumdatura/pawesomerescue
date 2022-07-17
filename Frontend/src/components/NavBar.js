import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/home" activeClassName={styles.active}>
              Home
            </NavLink>
          </li>
          <li>
            {/* currently only works if the role is user */}
            <NavLink to="/form" activeClassName={styles.active}>
              Submit an Adoption
            </NavLink>
          </li>
          <li>
            <NavLink to="/archive" activeClassName={styles.active}>
              Archive
            </NavLink>
          </li>
          <li>
            <NavLink to="/favourite" activeClassName={styles.active}>
              Favourite
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName={styles.active}>
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
