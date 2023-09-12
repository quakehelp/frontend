
import { GoogleMap, LoadScript } from '@react-google-maps/api';
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
    const {onLoad,onError,onUnmount}=useMapStore()
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
        </GoogleMap>
        </LoadScript>
    );
}

export default Map;