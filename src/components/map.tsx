
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import useMapStore from '../states/map.state';





type Props = {
    center: {
        lat: number,
        lng: number
    }
    className?: string,
    zoom?: number

}
function Map({ className, center, zoom = 8 }: Props) {
    const { onLoad, onError, onUnmount, locations, activeLocation, setActiveLocation } = useMapStore()
    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY as string}
            onLoad={onLoad}
            onError={onError}
            onUnmount={onUnmount}

        >
            <GoogleMap
                mapContainerClassName={className}
                center={center}
                zoom={zoom}
                options={{
                    disableDefaultUI: true,

                }}
            >
                {locations?.map(location => (
                    <Marker
                        key={location._id}
                        position={location.position}
                        title={location.name}
                        onClick={() => setActiveLocation(location)}
                    // onMouseOver={() => setActiveLocation(location)}
                    // onMouseOut={() => setActiveLocation(null)}
                    />
                ))}
                {activeLocation && (
                    <InfoWindow
                        position={activeLocation.position}
                       // onCloseClick={() => setActiveLocation(null)}
                        
                    >
                        <div>
                            <h4>{activeLocation.locationName}</h4>
                            <p>Population: {activeLocation.population}</p>
                            <p>Medical Help Needed: {activeLocation.medicalHelp}</p>
                            <p>Basic Help Needed: {activeLocation.basicHelp}</p>
                            <p>Deceased: {activeLocation.deceased}</p>
                            <p>Needs: {activeLocation.needs.join(", ")}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;