import React, { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import Loader from "@/Components/Loader";
import ArtWorkComponent from "@/Components/ArtWork";
import useGetSingleArtWork from "@/data/hooks/Artworks/useGetSingleArtWork.ts";
import useGetInfiniteArtworks from "@/data/hooks/Artworks/useGetInfiniteArtworks";
import useArtworkOrderStore from "@/data/store/useArtworkOrderStore";

const ArtWork: React.FunctionComponent = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { data, isLoading, error } = useGetSingleArtWork(id);
    const artwork = data?.data;

    const { data: infiniteData } = useGetInfiniteArtworks();

    const { artworkIds, setArtworkIds } = useArtworkOrderStore();

    useEffect(() => {
        if (artworkIds.length === 0 && infiniteData?.pages) {
            const ids = infiniteData.pages.flatMap((page) => page.data).map((item) => String(item.id));
            if (ids.length > 0) {
                setArtworkIds(ids);
            }
        }
    }, [artworkIds.length, infiniteData, setArtworkIds]);

    const currentIndex = id ? artworkIds.indexOf(String(id)) : -1;

    let prevId: string | null = null;
    let nextId: string | null = null;

    if (artworkIds.length > 1) {
        if (currentIndex > 0) {
            prevId = artworkIds[currentIndex - 1];
        } else if (currentIndex === 0) {
            prevId = artworkIds[artworkIds.length - 1];
        } else {
            prevId = artworkIds[0];
        }

        if (currentIndex >= 0 && currentIndex < artworkIds.length - 1) {
            nextId = artworkIds[currentIndex + 1];
        } else if (currentIndex === artworkIds.length - 1) {
            nextId = artworkIds[0]; // Loop to beginning
        } else {
            nextId = artworkIds[1] || artworkIds[0];
        }
    } else if (artworkIds.length === 1 && currentIndex === -1) {
        prevId = artworkIds[0];
        nextId = artworkIds[0];
    }

    const goToPrev = useCallback(() => {
        if (prevId) {
            navigate(`/artwork/${prevId}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [prevId, navigate]);

    const goToNext = useCallback(() => {
        if (nextId) {
            navigate(`/artwork/${nextId}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [nextId, navigate]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                goToPrev();
            } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                goToNext();
            } else if (e.key === "Escape") {
                navigate("/");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToPrev, goToNext, navigate]);

    if (isLoading) return <Loader />;
    if (error || !artwork) return <div style={{ padding: '3rem', textAlign: 'center' }}>Artwork not found.</div>;

    return (
        <ArtWorkComponent
            {...artwork}
            onPrev={goToPrev}
            onNext={goToNext}
            hasPrev={Boolean(prevId)}
            hasNext={Boolean(nextId)}
        />
    );
};

export default ArtWork;