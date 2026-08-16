import React from 'react';
import { NavLink } from "react-router";
import styles from './Header.module.css';

const Header: React.FunctionComponent = () => {
    return (
        <header className={styles.headerContainer}>
            <section className={styles.headerContentWrapper}>
                <NavLink className={styles.headerText} to={'/'}>
                    galleria.
                </NavLink>
            </section>
        </header>
    );
};

export default Header;