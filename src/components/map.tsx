/* eslint-disable @typescript-eslint/no-explicit-any */

import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';
import useMapStore from '../states/map.state';
import {  clsx } from '@mantine/core';
import { colors } from '../utils/theme';
import { useLocation, useNavigate } from 'react-router';





type Props = {
    center: {
        lat: number,
        lng: number
    }
    className?: string,
    zoom?: number

}

function Map({ className, zoom = 8 }: Props) {
    const { onLoad, onError, onUnmount, filter:locations, loading,center } = useMapStore()
    const navigate = useNavigate()
    const search = useLocation()
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
                onClick={(e) => {
                    console.log(e)







                    if (search.search) {
                        //remove seach
                        navigate('')
                    }
                }}
                options={{
                    clickableIcons: false,
                    disableDefaultUI: true,

                }}
            >
                {loading || locations?.map((location, i) => {

                    return <>
                        <OverlayView
                            key={i + location._id}
                            position={location.position}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}

                        >

                            <div onClick={() => {
                                navigate(`?location=${location._id}`)
                            }} style={{
                                border: `2px solid ${(colors as any)[location.pinStatus]}`
                            }} className={clsx('bg-white -translate-y-[170%] -translate-x-4 rounded-[14px] w-[250px] overflow-hidden flex flex-row justify-between gap-1',
                                // aligns[aligns.length * Math.random() | 0]
                            )
                            }>
                                <span className='text-2xl p-4'>{location.DouarName}</span>
                                <div style={{
                                    backgroundColor: (colors as any)[location.pinStatus],
                                }} className='h-auto w-[70px] flex flex-row items-center justify-center'>
                                    <img src={`icons/${location.pinStatus}.svg`} alt="douar" className='w-[28px]' />
                                </div>
                            </div>



                        </OverlayView>
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
                        > </Marker>
                    </>
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