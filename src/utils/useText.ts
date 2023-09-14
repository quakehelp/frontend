import { useTranslation } from 'react-i18next';

export const useText=(feature:string)=>{
  const {t}=useTranslation()
  return {
    text:(key:string)=>t(`${feature}.${key}`),
    common:(key:string)=>t(`common.${key}`),
  }
}