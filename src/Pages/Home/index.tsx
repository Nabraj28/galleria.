import React, {useState} from "react";
import styles from "./Home.module.css";
import {NavLink} from "react-router";
import useGetArtWorks from "@/data/hooks/Artworks/useGetArtWorks.ts";
import Loader from "@/Components/Loader";


const Home: React.FunctionComponent = () => {

    const [url, setUrl] = useState<string | undefined>('');
    const {data, isLoading, error} = useGetArtWorks(url);

    if (isLoading) return <Loader/>;
    if (error) return <div>Error...</div>;

    const handleNavigation = (url: string | undefined) => {
       if (url) setUrl(url);
    }

    return (
        <section className={styles.homeContainer}>
             <div className={styles.imageItemsContainer}>
                 {
                     data?.data.map((artwork, index) => (
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
            <div>
                <button
                    onClick={() => handleNavigation(data?.pagination?.prev_url)}
                    disabled={!data?.pagination?.prev_url} // Disable if no prev_url
                >
                    Prev
                </button>
                <button
                    onClick={() => handleNavigation(data?.pagination?.next_url)}
                    disabled={!data?.pagination?.next_url} // Disable if no next_url
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default Home;