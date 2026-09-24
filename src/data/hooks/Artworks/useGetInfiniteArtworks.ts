import { getData } from "@/data/apiUtils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Root } from "@/data/types";

const PAGE_SIZE = 24;

const useGetInfiniteArtworks = () => {
    return useInfiniteQuery<Root>({
        queryKey: ['ArtworksInfinite'],
        queryFn: ({ pageParam = 0 }) => {
            return getData<Root>(
                `/artworks?has_image=1&skip=${pageParam}&limit=${PAGE_SIZE}`
            );
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const { skip, limit } = lastPage.info.parameters;
            const nextSkip = skip + limit;
            if (nextSkip < lastPage.info.total) {
                return nextSkip;
            }
            return undefined;
        },
    });
};

export default useGetInfiniteArtworks;
