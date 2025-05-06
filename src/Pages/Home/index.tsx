import React from "react";
import styles from "./Home.module.css";
import { NavLink } from "react-router";
import useGetArtWorks from "@/data/hooks/Artworks/useGetArtWorks.ts";
import Loader from "@/Components/Loader";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import useUrlStore from "@/data/store/useUrlStore";


const Home: React.FunctionComponent = () => {

    const { url, setUrl } = useUrlStore();
    const { data, isLoading, error } = useGetArtWorks(url);

    if (isLoading) return <Loader />;
    if (error) return <div>Error...</div>;

    const handleNavigation = (url?: string) => {
      if(url){
          setUrl(url);
      }
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
                                <h3>{artwork.title.length > 100 ? artwork.title.slice(0, 100) : artwork.title}</h3>
                                <p>{artwork.artist_title}</p>
                            </div>
                        </NavLink>
                    ))
                }
            </div>
            <div className={styles.pageNavigationContainer}>
                <button
                    className={styles.navigationButton}
                    onClick={() => handleNavigation(data?.pagination?.prev_url)}
                    disabled={!data?.pagination?.prev_url}
                >
                    <MdChevronLeft size={25} color='black' />
                </button>
                <button
                    className={styles.navigationButton}
                    onClick={() => handleNavigation(data?.pagination?.next_url)}
                    disabled={!data?.pagination?.next_url}
                >
                    <MdChevronRight size={25} color='black' />
                </button>
            </div>
        </section>
    );
};

export default Home;