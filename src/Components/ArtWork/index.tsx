import styles from "@/Components/ArtWork/Artwork.module.css";
import React from "react";
import { ArtWorkProps } from "@/data/Interfaces";
import useImageViewStore from "@/data/store/useImageViewStore";
import useTextToggleStore from "@/data/store/useTextToggleStore";
import { GoScreenFull } from "react-icons/go";

const ArtWork: React.FunctionComponent<ArtWorkProps> = ({ title, artist_title, description, date_end, publication_history, provenance_text, exhibition_history, image_id }: ArtWorkProps) => {

    const { isImageOpen, setIsImageOpen } = useImageViewStore();
    const { isTextShown, setIsTextShown } = useTextToggleStore();

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
                        style={{ backgroundImage: `url('https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg')` }}
                    />
                    <div className={styles.titleContainer}>
                        <h1>{title && title.length > 80 ? title?.slice(0, 80) : title}</h1>
                        <span>{artist_title}</span>
                    </div>
                    <button className={styles.viewImageButton} onClick={() => setIsImageOpen(!isImageOpen)}>
                       <GoScreenFull color={'white'} size={25}/> View Image
                    </button>
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
                </div>

            </div>
            {
                isImageOpen &&
                <div className={styles.fullimageContainer} onClick={() => setIsImageOpen(!isImageOpen)}>
                    <img src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`} alt="" />
                </div>
            }
        </section>
    )
}

export default ArtWork