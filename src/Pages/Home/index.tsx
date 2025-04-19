import React from "react";
import styles from "./Home.module.css";
import {NavLink} from "react-router";
import useGetArtWorks from "@/data/hooks/Artworks/useGetArtWorks.ts";


const Home: React.FunctionComponent = () => {

    const {data, isLoading, error} = useGetArtWorks();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    return (
        <section className={styles.homeContainer}>

             <div className={styles.imageItemsContainer}>
                 {
                     data?.map((artwork,index) => (
                         <NavLink to='/' key={index} className={styles.imageItem}>
                                <img
                                    className={styles.image}
                                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                    alt={artwork.title}
                                />
                                <div className={styles.contentContainer}>
                                    <h3>{artwork.title}</h3>
                                </div>
                         </NavLink>
                     ))
                 }

             </div>
        </section>
    );
};

export default Home;