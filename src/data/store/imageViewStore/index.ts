import { create } from 'zustand';

type ImageViewStore = {
    isImageOpen: boolean;
    setIsImageOpen: (value: boolean) => void;
};

const useImageViewStore = create<ImageViewStore>((set) => ({
    isImageOpen: false,
    setIsImageOpen: (value) => set({ isImageOpen: value }),
}));

export default useImageViewStore;