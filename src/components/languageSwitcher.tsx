/* eslint-disable react-refresh/only-export-components */

import { Menu } from "@mantine/core";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import { IoLanguageOutline } from "react-icons/io5";
export const LOCALES=[
    {
        name:"Français",
        fullCode:"fr",
        code:"fr"
    },
    {
        name:"العربية",
        fullCode:"ar",
        code:"ar"
    }
]
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
  const isCurrentLanguage = (lng: string) => i18n.language === lng;

  return (
    <Menu shadow="md"  position="bottom-end" zIndex={100000000000}>
      <Menu.Target>
        <span  className="btn btn-circle btn-sm">
            <IoLanguageOutline className="text-lg"/>
        </span>
      </Menu.Target>

      <Menu.Dropdown className="z-20" >
        {LOCALES.map((locale, i) => (
          <Menu.Item
            key={i}
            onClick={() => changeLanguage(locale.fullCode)}
            className={cx({
              "text-white bg-primary": isCurrentLanguage(locale.fullCode),
            })}
          >
            {locale.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default LanguageSwitcher;
