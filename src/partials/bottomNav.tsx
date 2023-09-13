/* eslint-disable @typescript-eslint/no-explicit-any */
import useMapStore from "../states/map.state"

const BottomNav = () => {
    const {setFilter,locations}=useMapStore()
    return <div className="absolute bottom-0 left-[50%] w-full p-4 max-w-[500px] mx-auto -translate-x-[50%]">
        <div className="flex flex-row gap-4 items-center justify-center ">
      
           <img onClick={()=>{
              setFilter(locations?.filter(location=>location.pinStatus=='red') as any)
           }} src="images/red.svg" alt="logo" className="w-[70px]" />
           <img onClick={()=>{
              setFilter(locations)
           }} src="images/search.svg" alt="logo" className="w-20" />
           <img onClick={()=>{
              setFilter(locations?.filter(location=>location.pinStatus=='green') as any)
           }} src="images/green.svg" alt="logo" className="w-[70px]" />
        </div>
    </div>
}

export default BottomNav



