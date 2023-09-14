/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LoadingMap from "../components/LoadingMap";
import Map from "../components/map";
import NavBar from "../components/navBar";
import useMapStore from "../states/map.state";
import { Outlet } from "react-router";
import BottomLocationDetail from "../partials/bottomLocationDetail";
import { BiCurrentLocation } from "react-icons/bi";

function Home() {
    const { locations, getData,setCenter } = useMapStore()

    useEffect(() => {
        if (!locations) {
            getData()
        }
    }, [locations])
    const center = {
        lat: 31.0350759,
        lng: -8.4124458
    };
    useEffect(() => {
        getUserLocation()
    }, []);
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }, (error) => {
                console.error("Error fetching user location:", error);

            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
      }
    return <div className="relative overflow-hidden w-screen h-screen">


        <NavBar />

        <Map center={center} zoom={10} className="w-screen h-screen translate-y-10" />
        <div className="absolute bottom-[100px] right-3">
            <span onClick={getUserLocation} className="btn bg-white btn-circle shadow-xl">
                <BiCurrentLocation className="text-xl"/>
            </span>
        </div>
        <LoadingMap />
       
      <Outlet/>
      <BottomLocationDetail/>
    </div>
}

export default Home;


