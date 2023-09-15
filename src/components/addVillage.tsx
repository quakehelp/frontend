import { modals } from "@mantine/modals"
import { useTranslation } from "react-i18next";
import { IoAddOutline } from "react-icons/io5"
import AddVillageForm from "../partials/addVillageForm";
import useUser from "../states/user.state";
const AddVillage = () => {
  const { t } = useTranslation();
  const user = useUser(state => state.user)
  return <div>
    <button onClick={() => {
  
          modals.open({
            id: 'add-village',
            title: t("common.button.ajouter village"),
            children: <AddVillageForm position={{
              lat: 0,
              lng: 0

            }} enteredBy={user._id} phoneNumber={user.numberPhone} />


          })
        }

   
    } className='btn btn-primary rounded-full w-full text-white gap-4'>
      <IoAddOutline className="text-xl" />
      {t("common.button.ajouter village")}
    </button>
  </div>
}

export default AddVillage