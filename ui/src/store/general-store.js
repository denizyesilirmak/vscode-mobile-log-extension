import { create } from "zustand";

const useGeneralStore = create((set) => ({
  selectedSimulator: null,
  setSelectedSimulator: (simulator) => set({ selectedSimulator: simulator }),
  selectedEmulator: null,
  setSelectedEmulator: (emulator) => set({ selectedEmulator: emulator }),
}));

const useSelectedSimulator = () => {
  const selectedSimulator = useGeneralStore((state) => state.selectedSimulator);
  const setSelectedSimulator = useGeneralStore(
    (state) => state.setSelectedSimulator
  );

  return {
    selectedSimulator,
    setSelectedSimulator,
  };
};

const useSelectedEmulator = () => {
  const selectedEmulator = useGeneralStore((state) => state.selectedEmulator);
  const setSelectedEmulator = useGeneralStore(
    (state) => state.setSelectedEmulator
  );

  return {
    selectedEmulator,
    setSelectedEmulator,
  };
};
export { useGeneralStore, useSelectedSimulator, useSelectedEmulator };
