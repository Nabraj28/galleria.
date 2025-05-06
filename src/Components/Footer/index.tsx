import React from "react";
import styles from './Footer.module.css'

const Footer: React.FunctionComponent = () => {
    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footerContainer}>
                <h4 className={styles.footerText}><span>dev. by</span> Nabraj Poudel</h4>
            </div>
        </footer>
    )
}

export default Footer