import styles from "@/Components/ArtWork/Artwork.module.css";
import React from "react";
import {ArtWorkProps} from "@/data/Interfaces";

const ArtWork: React.FunctionComponent<ArtWorkProps> = ({title,artist_title,description,date_end,publication_history,provenance_text,exhibition_history,image_id}) => {

    const Description = description && description.length > 0
        ? description
        : publication_history && publication_history.length > 0
            ? publication_history
            : exhibition_history && exhibition_history.length > 0
                ? provenance_text : 'No description available';

    return (
        <section className={styles.artWorkWrapper}>
            <div className={styles.artWorkContainer}>

                <div className={styles.imageContainer}>
                    <div
                        className={styles.imageBackground}
                        style={{backgroundImage: `url('https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg')`}}
                    />
                    <div className={styles.titleContainer}>
                        <h1>{title}</h1>
                        <span>{artist_title}</span>
                    </div>
                    <button className={styles.viewImageButton}>View Image</button>
                </div>

                <div className={styles.descriptionContainer}>
                    <p className={styles.dateStyle}>{date_end}</p>
                    <p className={styles.description}>
                        {Description?.
                        replace(/<\/?p>/g, '').
                        replace(/<\/?em>/g, '')
                        }
                    </p>
                </div>

            </div>
        </section>
    )
}

export default ArtWork