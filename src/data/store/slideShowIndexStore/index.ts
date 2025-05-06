import { create } from 'zustand';

type SlideShowIndexStore = {
    currentIndex: number;
    setCurrentIndex: (updater: (prevIndex: number) => number) => void;
}

const useSlideShowIndexStore = create<SlideShowIndexStore>((set) => ({
    currentIndex: 0,
    setCurrentIndex: (updater) => set((state) => ({ currentIndex: updater(state.currentIndex) }))
}));

export default useSlideShowIndexStore;