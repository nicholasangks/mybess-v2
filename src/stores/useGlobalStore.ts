// stores/useGlobalStore.ts
import { create } from 'zustand';

type GlobalState = {
  lastUpdateTime: Date | null;
  setLastUpdateTime: (time: Date) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  lastUpdateTime: null,
  setLastUpdateTime: (time) => set({ lastUpdateTime: time }),
}));
