import { create } from 'zustand';

interface TextToggleStore {
    isTextShown: boolean;
    setIsTextShown: (value: boolean) => void;
}

const useTextToggleStore = create<TextToggleStore>((set)=>({
    isTextShown: false,
    setIsTextShown: (value) => set({ isTextShown: value })
}));

export default useTextToggleStore;