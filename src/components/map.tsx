/* eslint-disable @typescript-eslint/no-explicit-any */

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useMapStore from '../states/map.state';
import { useLocation, useNavigate } from 'react-router';
import { modals } from '@mantine/modals';
import AddVillageForm from '../partials/addVillageForm';
import { useTranslation } from 'react-i18next';
import useUser from '../states/user.state';





type Props = {
    center: {
        lat: number,
        lng: number
    }
    className?: string,
    zoom?: number

}

function Map({ className, zoom = 8 }: Props) {
    const {t}=useTranslation();
    const { onLoad, onError, onUnmount, filter: locations, loading, center } = useMapStore()
    const user = useUser(state => state.user)
    const navigate = useNavigate()
    const search = useLocation()
    const i18n=useTranslation().i18n
    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY as string}
            onLoad={onLoad}
            onError={onError}
            onUnmount={onUnmount}
            region='MA'
            language={i18n.language}

        >
            <GoogleMap
                id='map'

                mapContainerClassName={className}
                center={center}
                zoom={zoom}
                onClick={(e) => {

                    if (user && e) {
                        modals.openConfirmModal({
                            id: 'ask-add-village',
                            title: t("common.button.Confirm"),
                            children: t("common.button.ConfirmTxt"),
                            labels: {
                                confirm: t("common.button.ajouter"),
                                cancel: t("common.button.cancel")

                            },
                            onConfirm: () => {
                                modals.close('ask-add-village')
                                modals.open({
                                    id: 'add-village',
                                    title:  t("common.button.ajouter village"),
                                    children: <AddVillageForm position={{
                                        lat: e.latLng?.lat() || 0,
                                        lng: e.latLng?.lng() || 0

                                    }} enteredBy={user._id} phoneNumber={user.numberPhone} />


                                })
                            }

                        })
                    } else {

                        if (search.search) {
                            //remove seach
                            navigate('')
                        }
                    }
                }}
                options={{
                    clickableIcons: false,
                    disableDefaultUI: true,

                }}

            >
                {loading || locations?.map((location, i) => {

                    return  <Marker
                            key={i}
                            position={location.position}
                            label={location.DouarName}
                            icon={{

                                url: `/marker/${location.pinStatus}.svg`,

                                anchor: new google.maps.Point(17, 46),

                                scaledSize: new google.maps.Size(50, 50)

                            }}
                           onClick={() => {
                            if(user){
                                modals.open({
                                    id: 'add-village',
                                    title:  t("common.button.modifier village"),
                                    children: <AddVillageForm position={location.position} initialData={location} enteredBy={user._id} phoneNumber={user.numberPhone} />


                                })
                            }else
                            navigate(`?location=${location._id}`)
                           }}
                        />
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

                })}

            </GoogleMap>
        </LoadScript>
    );
}

export default Map;