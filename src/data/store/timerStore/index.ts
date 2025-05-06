import { create } from 'zustand';

interface TimerStore {
    timeRemaining: number;
    setTimeRemaining: (value: number | ((prev: number) => number)) => void;
}

const useTimerStore = create<TimerStore>((set) => ({
    timeRemaining: 15,
    setTimeRemaining: (value) => set(state => ({
        timeRemaining: typeof value === 'function' ? value(state.timeRemaining) : value
    })),
}));

export default useTimerStore;