import styles from "./Home.module.css";
import { NavLink } from "react-router";
import React, { useEffect, useRef } from "react";
import SkeletonGrid from "@/Components/SkeletonCard";
import { GalleryError } from "@/Components/ErrorState";
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

    const observerRef = useRef<HTMLDivElement | null>(null);

    const allArtworks = data?.pages.flatMap((page) => page.data) || [];

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

    if (isLoading) return (
        <section className={styles.homeContainer}>
            <div className={styles.imageItemsContainer}>
                <SkeletonGrid count={16} />
            </div>
        </section>
    );
    if (error) return <GalleryError onRetry={() => window.location.reload()} />;

    return (
        <section className={styles.homeContainer}>
            <div className={styles.imageItemsContainer}>
                {
                    allArtworks.map((artwork, index) => {
                        const artistTitle = artwork.creators?.[0]?.description || 'Unknown Artist';
                        const imageUrl = artwork.images?.web?.url || '';

                        return (
                            <NavLink to={`/artwork/${artwork.accession_number}`} key={`${artwork.id}-${index}`} className={styles.imageItem}>
                                <img
                                    className={styles.image}
                                    src={imageUrl}
                                    alt={artwork.title}
                                    loading="lazy"
                                />
                                <div className={styles.contentContainer}>
                                    <h3>{artwork.title && artwork.title.length > 100 ? artwork.title.slice(0, 100) : artwork.title}</h3>
                                    <p>{artistTitle}</p>
                                </div>
                            </NavLink>
                        );
                    })
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