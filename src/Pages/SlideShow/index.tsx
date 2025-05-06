import React, { useEffect, useRef, useCallback } from "react";
import ArtWork from "@/Components/ArtWork";
import Loader from "@/Components/Loader";
import useGetArtWorks from "@/data/hooks/Artworks/useGetArtWorks";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";
import styles from "./SlideShow.module.css";
import useSlideShowIndexStore from "@/data/store/slideShowIndexStore";
import usePlayPauseStore from "@/data/store/playPauseStore";
import useTimerStore from "@/data/store/timerStore";

const SlideShow: React.FunctionComponent = () => {

    const { data, isLoading, error } = useGetArtWorks();
    const { currentIndex, setCurrentIndex } = useSlideShowIndexStore();
    const artworks = data?.data || [];
    const { isPlaying, setIsPlaying } = usePlayPauseStore();
    const { setTimeRemaining } = useTimerStore()
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const countdownRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = useCallback(() => {
        setTimeRemaining(15);
    }, [setTimeRemaining]);

    const nextCard = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
        );
        resetTimer();
    }, [artworks.length, setCurrentIndex, resetTimer]);

    const prevCard = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
        );
        resetTimer();
    }, [artworks.length, setCurrentIndex, resetTimer]);


    useEffect(() => {
        if (isPlaying) {
            countdownRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        nextCard();
                        return 15;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (countdownRef.current) {
            clearInterval(countdownRef.current);
        }

        return () => {
            if (countdownRef.current) {
                clearInterval(countdownRef.current);
            }
        };
    }, [isPlaying, nextCard, setIsPlaying, setTimeRemaining, prevCard]);

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setTimeout(() => {
                nextCard();
            }, 15000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isPlaying, currentIndex, nextCard]);

    const togglePlayPause = useCallback(() => {
        if (isPlaying) {
            resetTimer();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, resetTimer, setIsPlaying]);

    const cleanup = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
        }
        setIsPlaying(false);
        resetTimer();
        setCurrentIndex(() => 0)
    }, [setIsPlaying, resetTimer, setCurrentIndex]);

    useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    if (isLoading) return <Loader />;
    if (error) return <div>Error...</div>;
    if (artworks.length === 0) return <div>No artworks found</div>;

    const currentArtwork = artworks[currentIndex];

    return (
        <>
            <section className={styles.slideShowContainer}>
                <ArtWork
                    title={currentArtwork.title}
                    artist_title={currentArtwork.artist_title}
                    date_end={currentArtwork.date_end}
                    description={currentArtwork.description}
                    exhibition_history={currentArtwork.exhibition_history}
                    image_id={currentArtwork.image_id}
                    provenance_text={currentArtwork.provenance_text}
                />

                <div className={styles.sliderButtonContainer}>
                    <button disabled={currentIndex === 0} onClick={prevCard}>
                        <RxTrackPrevious size={25} color='black' />
                    </button>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? (
                            <IoPauseOutline size={25} color='black' />
                        ) : (
                            <IoPlayOutline size={25} color='black' />
                        )}
                    </button>
                    <button disabled={currentIndex === artworks.length - 1} onClick={nextCard}>
                        <RxTrackNext size={25} color='black' />
                    </button>
                </div>
            </section>
        </>
    );
};

export default SlideShow;