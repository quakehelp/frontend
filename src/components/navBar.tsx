/* eslint-disable react-hooks/exhaustive-deps */
import { FiSearch } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { Alert, Space, clsx } from "@mantine/core";
import useUser from "../states/user.state";
import { modals } from "@mantine/modals";
import Auth from "../partials/auth";
import { notifications } from "@mantine/notifications";
import useMapStore from "../states/map.state";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./languageSwitcher";
import { useTranslation } from "react-i18next";
import { AiOutlineInfoCircle } from "react-icons/ai";
function NavBar() {
  const { t, i18n } = useTranslation();
  const { user, admin } = useUser((state) => state);
  const search = useMapStore(state => state.search)
  const [searchValue, setSearchValue] = useState<string>("")

  const [openBanner, setOpenBanner] = useState<boolean>(true)
  useEffect(() => {
    search(searchValue)
  }, [searchValue]);


  return (
    <div className="absolute top-0 left-0 z-10 w-full">


      <div className="navbar bg-primary text-primary-content px-4">
        <img src="logos/logo_white.png" alt="logo" className="w-20" />
        <div className="flex-grow"></div>
        <div className="join rounded-full ">
          <div>
            <div>
              <input
                className="input join-item input-sm w-[130px] text-black"
                placeholder={t("common.button.search")}

                value={searchValue}
                onChange={(e) => {
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
                title: t("common.button.login"),
                children: <Auth />,
              });
            } else {
              modals.openConfirmModal({
                title: t("common.button.logout"),
                children: t("common.button.logoutConfirm"),
                color: "red",
                confirmProps: {
                  color: "red",
                },
                labels: {
                  confirm: t("common.button.logout"),
                  cancel: t("common.button.cancel"),
                },
                onConfirm: () => {
                  try {
                    useUser.setState({ user: null, admin: false });
                    notifications.show({
                      title: t("common.button.titleSucclogout"),
                      message: t("common.button.logoutSucc"),
                      color: "green",
                      autoClose: 3000,
                    });
                  } catch (error) {
                    notifications.show({
                      title: t("common.button.titleErrlogout"),
                      message: t("common.button.logoutErr"),
                      color: "red",
                      autoClose: 3000,
                    });
                  }
                },
              });
            }
          }}
          className={clsx("btn btn-circle btn-sm", {
            "hidden": !admin
          })}
        >
          <BsPersonCircle />
        </span>
        <Space w="xs" />
        <LanguageSwitcher />
      </div>
     {openBanner&& <Alert onClose={()=>{
        setOpenBanner(false)
      }} dir={i18n.language === "ar" ? "rtl" : "ltr"} withCloseButton className="m-3 md:max-w-[400px] shadow-lg flex flex-col gap-2" icon={<AiOutlineInfoCircle size="1rem" />} title={t("banner.title")} color="red">
        <div className="flex flex-col gap-1">
          <span>{t("banner.text")} <a href="https://wa.me/212661822590" target="_blank" className="text-blue-600">{t("banner.link")}</a></span>

        </div>

      </Alert>
}
    </div>
  );
}

export default NavBar;
