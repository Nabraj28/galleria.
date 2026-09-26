import ArtWorkComponent from "@/Components/ArtWork";
import React, { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { ArtworkError } from "@/Components/ErrorState";
import ArtworkSkeleton from "@/Components/SkeletonCard/ArtworkSkeleton";
import useGetSingleArtWork from "@/data/hooks/Artworks/useGetSingleArtWork.ts";
import {useArtworkNavigation} from "@/data/hooks/Artworks/useArtworkNavigation.ts";

const ArtWork: React.FunctionComponent = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { data: artwork, isLoading, error } = useGetSingleArtWork(id);

    const { getNextAccessionNumber, prevAccessionNumber, hasNext, isFetchingNext } = useArtworkNavigation(id);

    const goToPrev = useCallback(() => {
        if (prevAccessionNumber) {
            navigate(`/artwork/${prevAccessionNumber}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [prevAccessionNumber, navigate]);

    const goToNext = useCallback(async () => {
        const next = await getNextAccessionNumber();
        if (next) {
            navigate(`/artwork/${next}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [getNextAccessionNumber, navigate]);

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

    if (isLoading) return <ArtworkSkeleton />;
    if (error || !artwork) return <ArtworkError onRetry={() => window.location.reload()} />;

    return (
        <ArtWorkComponent
            {...artwork}
            onPrev={goToPrev}
            onNext={goToNext}
            hasPrev={Boolean(prevAccessionNumber)}
            hasNext={hasNext}
            isFetchingNext={isFetchingNext}
        />
    );
};

export default ArtWork;