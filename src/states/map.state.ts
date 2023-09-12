import { create } from "zustand";

type MapState = {
    loading: boolean;
    error?: string;
    onLoad: () => void;
    onError: () => void;
    onUnmount: () => void;

}

const useMapStore = create<MapState>((set) => ({
    loading: true,
    onLoad: () => set({ loading: false }),
    onError: () => set({ loading: false, error: "Error on loading map" }),
    onUnmount: () => set({ loading: false, error: undefined })
}))


export default useMapStore;