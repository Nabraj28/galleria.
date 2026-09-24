import React from "react";
import styles from "./SkeletonCard.module.css";

const SkeletonCard: React.FunctionComponent = () => {
    return (
        <div className={styles.skeletonItem}>
            <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonArtist} />
            </div>
        </div>
    );
};

interface SkeletonGridProps {
    count?: number;
}

const SkeletonGrid: React.FunctionComponent<SkeletonGridProps> = ({ count = 12 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </>
    );
};

export { SkeletonCard, SkeletonGrid };
export default SkeletonGrid;
