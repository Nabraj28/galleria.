import {useQuery} from "@tanstack/react-query";
import {getData} from "@/data/apiUtils";
import {artWorksType} from "@/data/Interfaces";

const useGetArtWorks = (id?: number)=>{
    const endpoint =   `/artworks${id? `/${id}` : ''}?limit=24&fields=id,title,artist_title,date_display,publication_history,exhibition_history,provenance_text,image_id`;
    return useQuery<artWorksType[]>({
        queryKey: id ? ['Artworks', id] : ['Artworks'],
        queryFn:()=>getData(endpoint)
    })
}

export default useGetArtWorks