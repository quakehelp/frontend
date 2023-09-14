/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LoadingMap from "../components/LoadingMap";
import Map from "../components/map";
import NavBar from "../components/navBar";
import useMapStore from "../states/map.state";
import { Outlet, useLocation } from "react-router";
import BottomLocationDetail from "../partials/bottomLocationDetail";
import { BiCurrentLocation } from "react-icons/bi";
import { modals } from "@mantine/modals";
import useUser from "../states/user.state";

function Home() {
    const { locations, getData,setCenter } = useMapStore()
    const {setAdmin,admin}=useUser(state=>state)
    const search=useLocation().search
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

    useEffect(() => {
        if (search && !admin) {
            console.log('search', search)
            const params = new URLSearchParams(search)
            const admin = params.get('invitation')
            console.log('admin', admin)
            if(admin && admin==="admin"){
                modals.openConfirmModal({
                    title:"Confirmation",
                    children:"Voulez-vous accepter l'invitation de l'administrateur ?",
                    labels:{
                        confirm:"Accepter",
                        cancel:"Refuser"
                    },
                    onConfirm:()=>{
                        setAdmin(true)

                    }

                });
            }
            
        }
    }, [search]);
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

        <Map center={center} zoom={10} className="w-screen h-screen" />
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


