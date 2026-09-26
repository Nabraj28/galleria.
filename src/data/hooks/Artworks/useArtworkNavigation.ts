import { useQueryClient } from "@tanstack/react-query";

export const useArtworkNavigation = (currentAccessionNumber: string | undefined) => {
    const queryClient = useQueryClient();

    const cachedData = queryClient.getQueryData<{
        pages: { data: { accession_number: string }[] }[];
    }>(['ArtworksInfinite']);

    const allAccessionNumbers = cachedData?.pages.flatMap(page => page.data.map(a => a.accession_number)) ?? [];
    const currentIndex = allAccessionNumbers.indexOf(currentAccessionNumber ?? '');

    return {
        nextAccessionNumber: currentIndex >= 0 && currentIndex < allAccessionNumbers.length - 1
            ? allAccessionNumbers[currentIndex + 1]
            : null,
        prevAccessionNumber: currentIndex > 0
            ? allAccessionNumbers[currentIndex - 1]
            : null,
    };
};