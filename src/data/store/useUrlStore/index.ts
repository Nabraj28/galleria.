import { create } from 'zustand';

interface UrlStore {
    url: string;
    setUrl: (value: string) => void;
}

const useUrlStore = create<UrlStore>(() => ({
    url:'',
    setUrl: (value) => ({ url: value })
}))

export default useUrlStore;