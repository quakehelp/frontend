import LoadingMap from "../components/LoadingMap";
import AddVillage from "../components/addVillage";
import Map from "../components/map";
import NavBar from "../components/navBar";

function Home() {
    const center = {
        lat: 31.0350759,
        lng: -8.4124458
    };

    return <>


        <NavBar />

        <Map center={center} zoom={9} className="w-screen h-screen translate-y-10" />
        <LoadingMap />
        <div className="absolute bottom-0 left-[50%] w-full p-4 max-w-[500px] mx-auto -translate-x-[50%]">
            <AddVillage />
        </div>
    </>
}

export default Home;