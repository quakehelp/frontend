
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import api from "../utils/api";

export type Status = 'green' | 'yellow' | 'red'
export type RoadStatus = 'available' | 'dangerous' | 'unavailable'
export type TLocation = {
   
    DouarName: string
    position: {
        lat: number
        lng: number
    },
    enteredBy: string,
    population: number,
    assoName: string,
    roadStatus: RoadStatus,
    createdAt: Date,
    needs: string,
    pinStatus: Status,
    phoneNumber: string,
}
export type Location ={_id:string,     DouarName: string
    position: {
        lat: number
        lng: number
    },
    enteredBy: string,
    population: number,
    assoName: string,
    roadStatus: RoadStatus,
    createdAt: Date,
    needs: string,
    pinStatus: Status,
    phoneNumber: string,}


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
    update: (location: Location) => Promise<void>
    setActiveLocation: (location: Location) => void,
    addLocation: (location: TLocation) => Promise<void>,
    setFilter: (filter: Location[] | undefined) => void,
    search:(query:string)=>void
    center: {
        lat: number
        lng: number
    },
    setCenter: (c: {
        lat: number
        lng: number
    }) => void



}

const useMapStore = create<MapState>((set, get) => ({
    loading: true,
    locations: undefined,
    center: {
        lat: 31.7943,
        lng: -7.0849
    },
    activeLocation: undefined,
    filter: undefined,
    search:(query)=>{
        const locations=get().locations
       
        if(locations){
            if(query.length===0) return set({filter:locations})
            else{
            const filter=locations.filter((l)=>l.DouarName.toLowerCase().includes(query.toLowerCase()))
            const first=filter[0]
            if(first){
                set({center:{lat:31.7943,lng:-7.0849}})
                console.log('center')
                set({center:first.position})
            }
            set({filter})
            }
        }
    },
    update: (location) => {
        return api.put(`/locations/${location._id}`, location).then((res) => {
            const data = res.data
            const locations = get().locations
            const index = locations?.findIndex((l) => l._id === data._id)
            if (index !== undefined && index !== -1) {
                locations?.splice(index, 1, data)
                set({ locations: [...(locations || [])], filter: [...(locations || [])] })
            }
        }
        )
    },
    addLocation: (location) => {
        const locations = get().locations
        return api.post("/locations", location).then((res) => {
            const data = res.data
            set({ locations: [...(locations || []), data], filter: [...(locations || []), data] })
        })
    },
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


