/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import api from "../utils/api";

export type Status='green'|'yellow'|'red'
export type RoadStatus= 'available'|'dangerous'|'unavailable'
export interface TLocation extends Omit<Location, 'constructor'> {}
export type Location=any


type MapState = {
    loading: boolean;
    error?: string;
    activeLocation:Location|undefined;
    locations: Location[] |undefined;
    onLoad: () => void;
    onError: () => void;
    onUnmount: () => void;
    getData:()=>Promise<void>
    setActiveLocation:(location:Location)=>void

}

const useMapStore = create<MapState>((set) => ({
    loading: true,
    locations:undefined,
    activeLocation:undefined,
    onLoad: () => set({ loading: false }),
    onError: () => set({ loading: false, error: "Error on loading map" }),
    onUnmount: () => set({ loading: false, error: undefined }),
    setActiveLocation:(location)=>{
        set({activeLocation:location})
    },
    getData:()=>{
        set({loading:true})
       return api.get("/locations").then((res)=>{
            const data=res.data
            
            set({locations:data})
        }).finally(()=>set({loading:false}))
    }

}))


export default useMapStore;