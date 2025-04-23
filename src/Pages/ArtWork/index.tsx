import {useParams} from "react-router";
import React from "react";

const ArtWork: React.FunctionComponent = () => {
    const {id} = useParams();
    return (
        <div>{id}</div>
    )
}

export default ArtWork