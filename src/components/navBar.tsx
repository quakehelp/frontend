/* eslint-disable react-hooks/exhaustive-deps */
import { FiSearch } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { Space, clsx } from "@mantine/core";
import useUser from "../states/user.state";
import { modals } from "@mantine/modals";
import Auth from "../partials/auth";
import { notifications } from "@mantine/notifications";
import useMapStore from "../states/map.state";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./languageSwitcher";
function NavBar() {
  const {user,admin} = useUser((state) => state);
  const search=useMapStore(state=>state.search)
  const [searchValue, setSearchValue] = useState<string>("")

  useEffect(() => {
    search(searchValue)
  }, [searchValue]);
  return (
    <div className="navbar bg-primary text-primary-content absolute top-0 left-0 z-10 px-4">
      <img src="logos/logo_white.png" alt="logo" className="w-20" />
      <div className="flex-grow"></div>
      <div className="join rounded-full ">
        <div>
          <div>
            <input
              className="input join-item input-sm w-[130px] text-black"
              placeholder="Search"
              value={searchValue}
              onChange={(e)=>{
                setSearchValue(e.target.value)
              }}
            />
          </div>
        </div>

        <span className="btn btn-sm join-item ">
          <FiSearch className="text-xl" />
        </span>
      </div>
      <Space w="xs" />
      <span
        onClick={() => {
          if (!user) {
            modals.open({
              title: "Authentification",
              children: <Auth />,
            });
          } else {
            modals.openConfirmModal({
              title: "Déconnexion",
              children: "Voulez-vous vraiment vous déconnecter ?",
              color: "red",
              confirmProps: {
                color: "red",
              },
              labels: {
                confirm: "Déconnexion",
                cancel: "Annuler",
              },
              onConfirm: () => {
                try {
                  useUser.setState({ user: null,admin:false });
                  notifications.show({
                    title: "Succès",
                    message: "Vous êtes déconnecté avec succès",
                    color: "green",
                    autoClose: 3000,
                  });
                } catch (error) {
                  notifications.show({
                    title: "Erreur",
                    message: "Une erreur s'est produite",
                    color: "red",
                    autoClose: 3000,
                  });
                }
              },
            });
          }
        }}
        className={clsx("btn btn-circle btn-sm",{
          "hidden":!admin
        })}
      >
        <BsPersonCircle />
      </span>
      <Space w="xs" />
      <LanguageSwitcher/>
    </div>
  );
}

export default NavBar;
