import {useParams} from "react-router";
import React from "react";
import useGetArtWorks from "@/data/hooks/Artworks/useGetArtWorks.ts";
import styles from "./ArtWork.module.css";
import Loader from "@/Components/Loader";

const ArtWork: React.FunctionComponent = () => {

    const {id} = useParams();
    const {data,isLoading,error} = useGetArtWorks({id: Number(id)});
    const artwork = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (isLoading) return <Loader/>;
    if(error) return <div>Error..</div>

    const {
        title,
        artist_title,
        description,
        date_end,
        publication_history,
        exhibition_history,
        provenance_text,
        image_id
    } = artwork || {};

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
                    <div className={styles.imageBackground} style={{backgroundImage: `url('https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg')`}}/>
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