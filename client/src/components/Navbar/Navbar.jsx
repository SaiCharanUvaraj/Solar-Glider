import React from 'react'
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.navbarTitle}>Drone Monitoring App</h1>
        </nav>
    );
};

export default Navbar;
