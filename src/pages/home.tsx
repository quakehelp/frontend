/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LoadingMap from "../components/LoadingMap";
import Map from "../components/map";
import NavBar from "../components/navBar";
import useMapStore from "../states/map.state";
import { Outlet } from "react-router";
import BottomLocationDetail from "../partials/bottomLocationDetail";

function Home() {
    const { locations, getData } = useMapStore()

    useEffect(() => {
        if (!locations) {
            getData()
        }
    }, [locations])
    const center = {
        lat: 31.0350759,
        lng: -8.4124458
    };

    return <div className="relative overflow-hidden w-screen h-screen">


        <NavBar />

        <Map center={center} zoom={10} className="w-screen h-screen translate-y-10" />
        <LoadingMap />
       
      <Outlet/>
      <BottomLocationDetail/>
    </div>
}

export default Home;


