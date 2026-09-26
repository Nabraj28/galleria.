import { Data } from "@/data/types";
import { NavLink } from "react-router";
import { GoScreenFull } from "react-icons/go";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/Components/ArtWork/Artwork.module.css";
import { LuChevronLeft, LuChevronRight, LuLayoutGrid } from "react-icons/lu";

export interface ArtWorkProps extends Partial<Data> {
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

const ArtWork: React.FunctionComponent<ArtWorkProps> = (props) => {

    const {
        title,
        creators,
        description,
        creation_date_latest,
        images,
        onPrev,
        onNext,
        hasPrev,
        hasNext,
    } = props;

    const [ isImageOpen, setIsImageOpen ] = useState(false);
    const [ isTextShown, setIsTextShown ] = useState(false);

    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const isPointerDevice = useRef(false);
    useEffect(() => {
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const smallScreen = window.innerWidth < 1000;
        isPointerDevice.current = !coarsePointer && !smallScreen;
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!isPointerDevice.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const artist_title = creators?.[0]?.description || 'Unknown Artist';
    const imageUrl = images?.web?.url || '';

    const cleanDescription = description?.replace(/<\/?p>/g, '').replace(/<\/?em>/g, '');
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
                        style={{ backgroundImage: `url('${imageUrl}')` }}
                    >
                        <button
                            className={styles.viewImageButton}
                            onClick={() => setIsImageOpen(!isImageOpen)}
                        >
                            <GoScreenFull color={'white'} size={25} /> View Image
                        </button>
                    </div>
                    <div className={styles.titleContainer}>
                        <h1>
                            {title && title.length > 80 ? title.slice(0, 80) : title}
                        </h1>
                        <span>
                            {artist_title}
                        </span>
                    </div>
                </div>

                <div className={styles.descriptionContainer}>
                    <p className={styles.dateStyle}>
                        {creation_date_latest}
                    </p>

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

            {isImageOpen && (
                <div className={styles.fullimageContainer} onClick={() => setIsImageOpen(false)}>
                    <div className={styles.zoomWrapper} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={imageUrl}
                            alt={title}
                            onMouseEnter={() => isPointerDevice.current && setIsHovered(true)}
                            onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 50, y: 50 }); }}
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