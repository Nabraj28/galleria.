import { useQuery } from "@tanstack/react-query";
import { getData } from "@/data/apiUtils";
import { singleArtworkType } from "@/data/Interfaces";


const useGetSingleArtWork = (id: string | undefined) => {

    const endpoint = `/artworks/${id}?fields=id,title,description,artist_title,date_end,publication_history,exhibition_history,provenance_text,image_id`;
    return useQuery<singleArtworkType>({
        queryKey: ['Artworks', id],
        queryFn: () => getData<singleArtworkType>(endpoint)
    })
}

export default useGetSingleArtWork