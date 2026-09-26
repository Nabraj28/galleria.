import { getData } from "@/data/apiUtils";
import {ArtworkResponse} from "@/data/types";
import { useQuery } from "@tanstack/react-query";

const useGetSingleArtWork = (accessionNumber: string | undefined) => {
    return useQuery({
        queryKey: ['artwork', accessionNumber],
        queryFn: async () => {
            const res = await getData<ArtworkResponse>(
                `/artworks/?q=${encodeURIComponent(accessionNumber!)}&limit=10`
            );
            const match = res.data.find(a => a.accession_number === accessionNumber);
            if (!match) throw new Error('Artwork not found');
            return match;
        },
        enabled: !!accessionNumber,
    });
};

export default useGetSingleArtWork;