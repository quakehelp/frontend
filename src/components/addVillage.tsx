import { modals } from "@mantine/modals"
import { IoAddOutline } from "react-icons/io5"
const AddVillage = () => {
  return <div>
    <button onClick={()=>{
      modals.openConfirmModal({
        title:"Informations",
        labels:{
          confirm:"Ok",
          cancel:"Annuler"
        },
        cancelProps:{
          className:"hidden"
        },
        
        children:"Cliquer sur la carte pour ajouter un village ou modifier un village existant en cliquant dessus",
      })
    }} className='btn btn-primary rounded-full w-full text-white gap-4'>
    <IoAddOutline className="text-xl"/>
    Add Village
  </button>
  </div>
}

export default AddVillage