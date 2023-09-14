import { modals } from "@mantine/modals"
import { useTranslation } from "react-i18next";
import { IoAddOutline } from "react-icons/io5"
const AddVillage = () => {
  const {t}=useTranslation();
  return <div>
    <button onClick={()=>{
      modals.openConfirmModal({
        title:t("AddVillage.Informations"),
        labels:{
          confirm:t("common.button.search"),
          cancel:t("common.button.cancel")
        },
        cancelProps:{
          className:"hidden"
        },
        
        children:t("AddVillage.InfoDetails"),
     
     
      })
    }} className='btn btn-primary rounded-full w-full text-white gap-4'>
    <IoAddOutline className="text-xl"/>
    {t("common.button.ajouter village")}
  </button>
  </div>
}

export default AddVillage