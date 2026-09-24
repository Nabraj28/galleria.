import React from "react";
import { NavLink } from "react-router";
import styles from "./ErrorState.module.css";

interface GalleryErrorProps {
    onRetry?: () => void;
}

export const GalleryError: React.FunctionComponent<GalleryErrorProps> = ({ onRetry }) => {
    return (
        <div className={styles.errorWrapper}>
            <div className={styles.errorBox}>
                <div className={styles.iconRing}>✦</div>
                <div className={styles.divider} />
                <h2 className={styles.errorTitle}>Failed to Load Gallery</h2>
                <p className={styles.errorMessage}>
                    We couldn't fetch the artworks right now. This might be a
                    temporary issue with the network or the museum's API.
                </p>
                {onRetry && (
                    <button className={styles.retryButton} onClick={onRetry}>
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

interface ArtworkErrorProps {
    onRetry?: () => void;
}

export const ArtworkError: React.FunctionComponent<ArtworkErrorProps> = ({ onRetry }) => {
    return (
        <div className={styles.artworkErrorWrapper}>
            <div className={styles.errorBox}>
                <div className={styles.iconRing}>◎</div>
                <div className={styles.divider} />
                <h2 className={styles.errorTitle}>Artwork Not Found</h2>
                <p className={styles.errorMessage}>
                    This piece couldn't be retrieved. It may have been moved,
                    removed, or the connection was interrupted.
                </p>
                <div className={styles.actions}>
                    {onRetry && (
                        <button className={styles.retryButton} onClick={onRetry}>
                            Try Again
                        </button>
                    )}
                    <NavLink to="/" className={styles.backLink}>
                        Back to Gallery
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
