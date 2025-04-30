import React from "react";
import styles from "./Home.module.css";
import {NavLink} from "react-router";
import useGetArtWorks from "@/data/hooks/Artworks/useGetArtWorks.ts";
import Loader from "@/Components/Loader";


const Home: React.FunctionComponent = () => {

    const {data, isLoading, error} = useGetArtWorks();

    if (isLoading) return <Loader/>;
    if (error) return <div>Error...</div>;


    console.log(data);



    return (
        <section className={styles.homeContainer}>
             <div className={styles.imageItemsContainer}>
                 {Array.isArray(data?.data) &&
                     data.data.map((artwork, index) => (
                         <NavLink to={`/artwork/${artwork.id}`} key={index} className={styles.imageItem}>
                                <img
                                    className={styles.image}
                                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                    alt={""}
                                />
                                <div className={styles.contentContainer}>
                                    <h3>{artwork.title}</h3>
                                    <p>{artwork.artist_title}</p>
                                </div>
                         </NavLink>
                     ))
                 }
             </div>
        </section>
    );
};

export default Home;