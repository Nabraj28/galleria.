import React from 'react';
import { NavLink } from "react-router";
import styles from './Header.module.css';
import { LuImagePlay } from "react-icons/lu";
import useTimerStore from "@/data/store/useTimerStore";
import usePlayPauseStore from "@/data/store/usePlayPauseStore";


const Header: React.FunctionComponent = () => {

    const { isPlaying } = usePlayPauseStore();

    const { timeRemaining } = useTimerStore();

    const location = window.location.pathname;

    return (
        <header className={styles.headerContainer}>
            <section className={styles.headerContentWrapper}>
                <NavLink className={styles.headerText} to={'/'}>
                    galleria.
                </NavLink>
                <NavLink className={styles.timer} to={'/slideshow'}>
                    {isPlaying && location.includes('/slideshow') ?
                        <span>
                            {timeRemaining}s
                        </span>
                        : <LuImagePlay size={25} color='black' />
                    }
                </NavLink>
            </section>
        </header>
    )
}

export default Header