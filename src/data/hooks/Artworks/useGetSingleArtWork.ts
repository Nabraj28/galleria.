import { getData } from "@/data/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { SingleRoot } from "@/data/types";

const useGetSingleArtWork = (id: string | undefined) => {
    return useQuery<SingleRoot>({
        queryKey: ['Artworks', id],
        queryFn: () => getData<SingleRoot>(`/artworks/${id}`),
        enabled: !!id
    });
};

export default useGetSingleArtWork;