import React from "react";
import { useParams } from "react-router";
import Loader from "@/Components/Loader";
import ArtWorkComponent from "@/Components/ArtWork";
import useGetSingleArtWork from "@/data/hooks/Artworks/useGetSingleArtWork.ts";

const ArtWork: React.FunctionComponent = () => {

    const { id } = useParams();
    const { data, isLoading, error } = useGetSingleArtWork(id);
    const artwork = data?.data;

    if (isLoading) return <Loader />;
    if (error) return <div>Error..</div>

    return (
        <ArtWorkComponent {...artwork} />
    )
}

export default ArtWork