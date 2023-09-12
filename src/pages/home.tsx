/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LoadingMap from "../components/LoadingMap";
import AddVillage from "../components/addVillage";
import Map from "../components/map";
import NavBar from "../components/navBar";
import useMapStore from "../states/map.state";

function Home() {
    const {locations,getData}=useMapStore()

    useEffect(()=>{
        if(!locations){
            getData()
        }
    },[locations])
    const center = {
        lat: 31.0350759,
        lng: -8.4124458
    };

    return <div className="relative overflow-hidden w-screen h-screen">


        <NavBar />

        <Map  center={center} zoom={9} className="w-screen h-screen translate-y-10" />
        <LoadingMap />
        <div className="absolute bottom-0 left-[50%] w-full p-4 max-w-[500px] mx-auto -translate-x-[50%]">
            <AddVillage />
        </div>
    </div>
}

export default Home;