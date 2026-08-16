import { getData } from "@/data/apiUtils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { artWorksType } from "@/data/Interfaces";

const useGetInfiniteArtworks = () => {
    return useInfiniteQuery<artWorksType>({
        queryKey: ['ArtworksInfinite'],
        queryFn: ({ pageParam = 1 }) => {
            return getData<artWorksType>(
                `/artworks/search?query[exists][field]=image_id&page=${pageParam}&limit=24&fields=id,title,description,artist_title,date_end,publication_history,exhibition_history,provenance_text,image_id`
            );
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.pagination && lastPage.pagination.current_page < lastPage.pagination.total_pages) {
                return lastPage.pagination.current_page + 1;
            }
            return undefined;
        },
    });
};

export default useGetInfiniteArtworks;
