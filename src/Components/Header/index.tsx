import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router";
import { LuImagePlay } from "react-icons/lu";

const Header: React.FunctionComponent = () => {
    return (
        <header className={styles.headerContainer}>
            <section className={styles.headerContentWrapper}>
                <h1>galleria.</h1>
                <NavLink to={'/slideshow'}>
                    <LuImagePlay className={styles.iconStyle} />
                </NavLink>
            </section>
        </header>
    )
}

export default Header