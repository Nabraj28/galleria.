import { useCallback } from "react";
import useGetInfiniteArtworks from "./useGetInfiniteArtworks";

export const useArtworkNavigation = (currentAccessionNumber: string | undefined) => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteArtworks();

    const allAccessionNumbers = data?.pages.flatMap(page => page.data.map(a => a.accession_number)) ?? [];
    const currentIndex = allAccessionNumbers.indexOf(currentAccessionNumber ?? '');

    const prevAccessionNumber = currentIndex > 0 ? allAccessionNumbers[currentIndex - 1] : null;

    const isLastLoaded = currentIndex >= 0 && currentIndex === allAccessionNumbers.length - 1;
    const nextAccessionNumber = currentIndex >= 0 && !isLastLoaded
        ? allAccessionNumbers[currentIndex + 1]
        : null;

    const getNextAccessionNumber = useCallback(async (): Promise<string | null> => {
        if (nextAccessionNumber) return nextAccessionNumber;

        if (isLastLoaded && hasNextPage && !isFetchingNextPage) {
            const result = await fetchNextPage();
            const freshIds = result.data?.pages.flatMap(page => page.data.map(a => a.accession_number)) ?? [];
            const freshIndex = freshIds.indexOf(currentAccessionNumber ?? '');
            return freshIndex >= 0 && freshIndex < freshIds.length - 1 ? freshIds[freshIndex + 1] : null;
        }

        return null;
    }, [nextAccessionNumber, isLastLoaded, hasNextPage, isFetchingNextPage, fetchNextPage, currentAccessionNumber]);

    return {
        prevAccessionNumber,
        nextAccessionNumber,
        hasNext: Boolean(nextAccessionNumber) || (isLastLoaded && hasNextPage),
        getNextAccessionNumber,
        isFetchingNext: isFetchingNextPage,
    };
};