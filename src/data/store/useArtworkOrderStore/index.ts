import { create } from 'zustand';

interface ArtworkOrderStore {
    artworkIds: string[];
    setArtworkIds: (ids: string[]) => void;
}

const useArtworkOrderStore = create<ArtworkOrderStore>((set) => ({
    artworkIds: [],
    setArtworkIds: (ids) => set({ artworkIds: ids }),
}));

export default useArtworkOrderStore;
