import React, { useState } from "react";
import { NavLink } from "react-router";
import { GoScreenFull } from "react-icons/go";
import { ArtWorkProps } from "@/data/Interfaces";
import { getImageUrl } from "@/data/apiUtils/imageUtils";
import styles from "@/Components/ArtWork/Artwork.module.css";
import useImageViewStore from "@/data/store/useImageViewStore";
import useTextToggleStore from "@/data/store/useTextToggleStore";
import { LuChevronLeft, LuChevronRight, LuLayoutGrid } from "react-icons/lu";

const ArtWork: React.FunctionComponent<ArtWorkProps> = ({
    title,
    artist_title,
    description,
    date_end,
    publication_history,
    provenance_text,
    exhibition_history,
    image_id,
    onPrev,
    onNext,
    hasPrev,
    hasNext,
}) => {

    const { isImageOpen, setIsImageOpen } = useImageViewStore();
    const { isTextShown, setIsTextShown } = useTextToggleStore();

    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const Description = description && description.length > 0
        ? description
        : publication_history && publication_history.length > 0
            ? publication_history
            : exhibition_history && exhibition_history.length > 0
                ? provenance_text : 'No description available';

    const cleanDescription = Description?.replace(/<\/?p>/g, '').replace(/<\/?em>/g, '');
    const descriptionText = cleanDescription && (isTextShown || cleanDescription.length <= 1000
        ? cleanDescription
        : `${cleanDescription.slice(0, 1000)}...`);

    const toggleReadMore = () => {
        setIsTextShown(!isTextShown);
    };

    return (
        <section className={styles.artWorkWrapper}>
            <div className={styles.artWorkContainer}>

                <div className={styles.imageContainer}>
                    <div
                        className={styles.imageBackground}
                        style={{ backgroundImage: `url('${getImageUrl(image_id)}')` }}
                    >
                        <button className={styles.viewImageButton} onClick={() => setIsImageOpen(!isImageOpen)}>
                            <GoScreenFull color={'white'} size={25} /> View Image
                        </button>
                    </div>
                    <div className={styles.titleContainer}>
                        <h1>
                            {title && title.length > 80 ? title.slice(0, 80) : title}
                        </h1>
                        <span>
                            {artist_title || 'Unknown Artist'}
                        </span>
                    </div>
                </div>

                <div className={styles.descriptionContainer}>
                    <p className={styles.dateStyle}>{date_end}</p>

                    <p className={styles.description}>
                        {descriptionText}
                        {cleanDescription && cleanDescription.length > 1000 && (
                            <span
                                onClick={toggleReadMore}
                                className={styles.readMore}
                            >
                                {isTextShown ? 'Show Less' : 'Read More'}
                            </span>
                        )}
                    </p>

                    {/* Bottom-Right Controls */}
                    <div className={styles.bottomControls}>
                        {onPrev && (
                            <button
                                className={styles.bottomButton}
                                onClick={onPrev}
                                disabled={!hasPrev}
                                title="Previous Artwork (Left Arrow)"
                                aria-label="Previous Artwork"
                            >
                                <LuChevronLeft size={18} />
                                <span>PREV</span>
                            </button>
                        )}

                        {onNext && (
                            <button
                                className={styles.bottomButton}
                                onClick={onNext}
                                disabled={!hasNext}
                                title="Next Artwork (Right Arrow)"
                                aria-label="Next Artwork"
                            >
                                <span>NEXT</span>
                                <LuChevronRight size={18} />
                            </button>
                        )}

                        <NavLink
                            to="/"
                            className={styles.backButton}
                            title="Back to Gallery"
                            aria-label="Back to Gallery"
                        >
                            <LuLayoutGrid size={16} />
                            <span>GALLERY</span>
                        </NavLink>
                    </div>
                </div>

            </div>

            {/* Modal Image with hover pointing zoom */}
            {isImageOpen && (
                <div className={styles.fullimageContainer} onClick={() => setIsImageOpen(false)}>
                    <div className={styles.zoomWrapper} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={getImageUrl(image_id)}
                            alt={title}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onMouseMove={handleMouseMove}
                            style={{
                                transform: isHovered ? 'scale(1.8)' : 'scale(1)',
                                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                            }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ArtWork;