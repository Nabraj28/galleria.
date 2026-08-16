export const getImageUrl = (imageId?: string): string => {
    if (!imageId) return "";
    return `/api/image?id=${imageId}`;
};
