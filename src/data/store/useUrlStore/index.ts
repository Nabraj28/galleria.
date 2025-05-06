import { create } from 'zustand';

interface UrlStore {
    url: string ;
    setUrl: (value: string ) => void;
}

const useUrlStore = create<UrlStore>((set) => ({
    url:'',
    setUrl: (value) => set({ url: value })
}))

export default useUrlStore;