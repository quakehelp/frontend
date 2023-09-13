
import { GoogleMap,  LoadScript, Marker } from '@react-google-maps/api';
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
    const { onLoad, onError, onUnmount, locations,loading } = useMapStore()
    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY as string}
            onLoad={onLoad}
            onError={onError}
            onUnmount={onUnmount}

        >
            <GoogleMap
            id='map'
                mapContainerClassName={className}
                center={center}
                zoom={zoom}
                options={{
                    disableDefaultUI: true,

                }}
            >
                {loading||locations?.map((location, i) => (

                    <Marker
                        key={i}
                        position={location.position}
                        label={location.locationName}
                        icon={{

                            url: `/marker/${location.pinStatus}.svg`,

                            anchor: new google.maps.Point(17, 46),

                            scaledSize: new google.maps.Size(50, 50)

                        }}
                    //onClick={() => this.handleToggleOpen()}
                    >
                        {/* 
                        <InfoWindow anchor={location.position}>
                            <span>Something</span>
                        </InfoWindow> */}

                    </Marker>
                    // <Marker
                    //     key={location._id}
                    //     position={location.position}
                    //     title={location.name}
                    //     onClick={() => setActiveLocation(location)}
                    // // onMouseOver={() => setActiveLocation(location)}
                    // // onMouseOut={() => setActiveLocation(null)}
                    // >
                    //         <InfoWindow

                    //    // onCloseClick={() => setActiveLocation(null)}

                    // >
                    //     <div className='-translate-y-10'>
                    //         <h4>{location.locationName}</h4>
                    //     </div>
                    // </InfoWindow>
                    // </Marker>

                ))}

            </GoogleMap>
        </LoadScript>
    );
}

export default Map;