import { useQuery } from "@tanstack/react-query";
import { getData } from "@/data/apiUtils";
import { artWorksType } from "@/data/Interfaces";


const useGetArtWorks = (url?: string) => {

    const endpoint = url || `/artworks?limit=${window.location.pathname.includes('/slideshow')?100:24}&fields=id,title,description,artist_title,date_end,publication_history,exhibition_history,provenance_text,image_id`;
    return useQuery<artWorksType>({
        queryKey: url ? ['Artworks', url] : ['Artworks'],
        queryFn: () => getData<artWorksType>(endpoint),
    })
}

export default useGetArtWorks