/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import api from "../utils/api";

export type Status = 'green' | 'yellow' | 'red'
export type RoadStatus = 'available' | 'dangerous' | 'unavailable'
export interface TLocation extends Omit<Location, 'constructor'> { }
export type Location = {
    status: Status
    DouarName: string
    position: {
        lat: number
        lng: number
    },
    population: number,
    assoName: number,
    roadStatus: RoadStatus,
    createdAt: Date,
    needs: string,
    pinStatus: Status,
    phoneNumber: string,
} & any


type MapState = {
    loading: boolean;
    error?: string;
    activeLocation: Location | undefined;
    locations: Location[] | undefined;
    filter: Location[] | undefined;
    onLoad: () => void;
    onError: () => void;
    onUnmount: () => void;
    getData: () => Promise<void>
    setActiveLocation: (location: Location) => void,
    setFilter: (filter: Location[] | undefined) => void,
    center: {
        lat: number
        lng: number
    },
    setCenter: (c: {
        lat: number
        lng: number
    }) => void



}

const useMapStore = create<MapState>((set) => ({
    loading: true,
    locations: undefined,
    center: {
        lat: 31.7943,
        lng: -7.0849
    },
    activeLocation: undefined,
    filter: undefined,
    setCenter: (c) => {
        set({ center: c })
    },
    setFilter: (filter) => {
        if (filter && filter.length > 0) {

            set({ center: filter[0].position })

        }
        set({ filter })
    },
    onLoad: () => set({ loading: false }),
    onError: () => set({ loading: false, error: "Error on loading map" }),
    onUnmount: () => set({ loading: false, error: undefined }),
    setActiveLocation: (location) => {
        set({ activeLocation: location })
    },
    getData: () => {
        set({ loading: true })
        return api.get("/locations").then((res) => {
            const data = res.data
            console.log('data', data)
            set({ locations: data, filter: data })
        }).finally(() => set({ loading: false }))
    }

}))


export default useMapStore;