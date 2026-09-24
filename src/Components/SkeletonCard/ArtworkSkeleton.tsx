import React from "react";
import styles from "./ArtworkSkeleton.module.css";

const ArtworkSkeleton: React.FunctionComponent = () => {
    return (
        <section className={styles.artWorkWrapper}>
            <div className={styles.artWorkContainer}>
                <div className={styles.imageContainer}>
                    <div className={styles.imageBackground} />
                    <div className={styles.titleContainer}>
                        <div className={styles.skeletonTitle} />
                        <div className={styles.skeletonArtist} />
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <div className={styles.skeletonDate} />
                    <div className={styles.skeletonLines}>
                        <div className={styles.skeletonLine} style={{ width: '100%' }} />
                        <div className={styles.skeletonLine} style={{ width: '92%' }} />
                        <div className={styles.skeletonLine} style={{ width: '85%' }} />
                        <div className={styles.skeletonLine} style={{ width: '90%' }} />
                        <div className={styles.skeletonLine} style={{ width: '78%' }} />
                        <div className={styles.skeletonLine} style={{ width: '65%' }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtworkSkeleton;
