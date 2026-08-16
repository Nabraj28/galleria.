import styles from "./Home.module.css";
import { NavLink } from "react-router";
import Loader from "@/Components/Loader";
import React, { useEffect, useRef } from "react";
import { getImageUrl } from "@/data/apiUtils/imageUtils";
import useArtworkOrderStore from "@/data/store/useArtworkOrderStore";
import useGetInfiniteArtworks from "@/data/hooks/Artworks/useGetInfiniteArtworks";

const Home: React.FunctionComponent = () => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useGetInfiniteArtworks();

    const { setArtworkIds } = useArtworkOrderStore();
    const observerRef = useRef<HTMLDivElement | null>(null);

    const allArtworks = data?.pages.flatMap((page) => page.data) || [];

    useEffect(() => {
        if (allArtworks.length > 0) {
            setArtworkIds(allArtworks.map((item) => String(item.id)));
        }
    }, [allArtworks.length, setArtworkIds]);

    useEffect(() => {
        const sentinel = observerRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1, rootMargin: '200px' }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) return <Loader />;
    if (error) return <div className={styles.errorContainer}>Failed to load artworks. Please try again.</div>;

    return (
        <section className={styles.homeContainer}>
            <div className={styles.imageItemsContainer}>
                {
                    allArtworks.map((artwork, index) => (
                        <NavLink to={`/artwork/${artwork.id}`} key={`${artwork.id}-${index}`} className={styles.imageItem}>
                            <img
                                className={styles.image}
                                src={getImageUrl(artwork.image_id)}
                                alt={artwork.title}
                                loading="lazy"
                            />
                            <div className={styles.contentContainer}>
                                <h3>{artwork.title && artwork.title.length > 100 ? artwork.title.slice(0, 100) : artwork.title}</h3>
                                <p>{artwork.artist_title || 'Unknown Artist'}</p>
                            </div>
                        </NavLink>
                    ))
                }
            </div>

            <div ref={observerRef} className={styles.sentinel}>
                {isFetchingNextPage && (
                    <div className={styles.loadingMore}>
                        <div className={styles.spinner} />
                        <span>Loading more artworks...</span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;