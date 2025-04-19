import {useQuery} from "@tanstack/react-query";
import {getData} from "@/data/apiUtils";
import {artWorksType} from "@/data/Interfaces";

const useGetArtWorks = ()=>{
    const endpoint =   `/artworks?limit=10&fields=id,title,artist_title,date_display,publication_history,exhibition_history,provenance_text,image_id`;
    return useQuery<artWorksType[]>({
        queryKey:['Artworks'],
        queryFn:()=>getData(endpoint)
    })
}

export default useGetArtWorks