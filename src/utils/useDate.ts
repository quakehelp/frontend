import dayjs from "dayjs"
import 'dayjs/locale/fr'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
const useDate=()=>{
  dayjs.locale('fr')
  return {
    dayjs,
    f:(format:string)=>dayjs().format(format),
    df:(date: string | number | dayjs.Dayjs | Date | null | undefined,format:string)=>dayjs(date).format(format)
  }
}

export default useDate