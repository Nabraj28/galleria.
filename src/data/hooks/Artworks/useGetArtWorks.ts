import {useQuery} from "@tanstack/react-query";
import {getData} from "@/data/apiUtils";
import {artWorksType} from "@/data/Interfaces";

interface UseGetArtWorksParams {
    id?: number;
    url?: string;
}

const useGetArtWorks = (params?: UseGetArtWorksParams)=>{
    const {id, url} = params || {};
    const endpoint = url ||  `/artworks${id? `/${id}` : ''}?limit=24&fields=id,title,description,artist_title,date_end,publication_history,exhibition_history,provenance_text,image_id`;
    return useQuery<artWorksType>({
        queryKey: url ? ['Artworks', url] : id ? ['Artworks', id] : ['Artworks'],
        queryFn:()=>getData<artWorksType>(endpoint),
    })
}

export default useGetArtWorks