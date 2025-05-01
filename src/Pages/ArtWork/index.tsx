import {useParams} from "react-router";
import React from "react";
import Loader from "@/Components/Loader";
import useGetSingleArtWork from "@/data/hooks/Artworks/useGetSingleArtWork.ts";
import ArtWorkComponent from "@/Components/ArtWork";

const ArtWork: React.FunctionComponent = () => {

    const {id} = useParams();
    const {data,isLoading,error} = useGetSingleArtWork(id);
    const artwork = data?.data

    if (isLoading) return <Loader/>;
    if(error) return <div>Error..</div>

    return (
            <ArtWorkComponent {...artwork}/>
    )
}

export default ArtWork