/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import useMapStore, { Location } from "../states/map.state"
import { colors } from "../utils/theme"
import { Space } from "@mantine/core"
import { BiSolidPhoneCall } from "react-icons/bi"
import useDate from "../utils/useDate"
import { useTranslation } from "react-i18next"
const BottomLocationDetail = () => {
    const {t}=useTranslation();
    const [location, setLocation] = useState<Location | undefined>(undefined)
    const locations = useMapStore(state => state.locations)
    const { dayjs } = useDate()
    const search = useLocation().search
    useEffect(() => {
        if (search) {
            const params = new URLSearchParams(search)
            const id = params.get('location')
            setLocation(locations?.find(location => location._id == id))
        } else {
            setLocation(undefined)
        }
    }, [search, locations])
    const i18n=useTranslation().i18n
    if (!location) return null
    return <div dir={i18n.language==="ar"?"rtl":"ltr"} className="absolute bottom-0 p-7 rounded-t-[30px] left-[50%] w-full bg-white max-w-[500px] mx-auto -translate-x-[50%]">
        <div className="space-y-4">
            <div className="flex flex-row items-center gap-3">
                <div style={{
                    backgroundColor: (colors as any)[location.pinStatus]

                }} className="rounded-full p-2 w-[40px] h-[40px] flex flex-row items-center justify-center">
                    <img src={`icons/${location.pinStatus}.svg`} alt="douar" className='w-[20px] h-[20px]' />

                </div>
                <span className="font-semibold">
                {t("common.button.la situation actuelle")}
                </span>
            </div>
            <div style={{
                border: `1px solid ${(colors as any)[location.pinStatus]}`
            }} className="rounded-[14px] p-3">
                <h5 className="my-0 text-2xl">
                    {location.DouarName}
                </h5>
                <span>
                    {location.assoName}
                </span>
            </div>
            <div style={{
                border: `1px solid ${(colors as any)[location.pinStatus]}`
            }} className="rounded-[14px] p-3">
                <div className="flex flex-row items-center gap-2">
                    <img src="images/population.svg" alt="arrow" className="w-10 h-10" />
                    {t("card.population")} : <span className="font-semibold">{location.population}</span>
                </div>
                <h6 className="font-semibold my-2 text-xl">
                {t("card.needs")}
                </h6>
                <p className="my-0">
                    {location.needs}
                </p>
                <div className="flex flex-row w-full justify-end text-xs text-gray-500">
                    {dayjs(location.createdAt).locale('fr').fromNow()}
                </div>
            </div>
            <Space h="md" />
            <button disabled={!location.phoneNumber} onClick={()=>{
                window.open(`tel://${location.phoneNumber}`)
            }} className="btn btn-primary rounded-full w-full text-white">
                <BiSolidPhoneCall />
                {t("common.button.appeler l'association")}
            </button>
        </div>
    </div>
}

export default BottomLocationDetail