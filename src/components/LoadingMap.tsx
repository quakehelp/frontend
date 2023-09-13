import data from '../assets/animations/loading_map.json';
import useMapStore from '../states/map.state';
import Animation from './animation';
function LoadingMap(

) {
    const visible = useMapStore(state => state.loading)
   if (!visible) return null;
    return <div className='h-screen w-screen absolute top-0 left-0 z-[2000] bg-white bg-opacity-90 flex flex-col items-center justify-center'>
        <Animation data={data} className='max-w-[240px] w-[50%]' />
        <span>
            Chargement de la carte...
        </span>
    </div>
}

export default LoadingMap;