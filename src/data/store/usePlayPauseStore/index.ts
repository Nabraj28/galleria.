import { create } from 'zustand';

interface PlayPauseStore {
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
}

const usePlayPauseStore = create<PlayPauseStore>((set) => ({
    isPlaying: false,
    setIsPlaying: (value) => set({ isPlaying: value }),
}));

export default usePlayPauseStore;