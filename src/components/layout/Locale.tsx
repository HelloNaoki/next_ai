import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import useCommonStore from "@/store/common";

export default function Locale() {
  const { language, setLanguage } = useCommonStore();
  const changeLanguage = (key: string) => {
    if (key === language) return;
    setLanguage(key);
    window.location.reload();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Image
          className="cursor-pointer"
          src={`/img/language-${language}.png`}
          alt="language"
          width={35}
          height={35}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Actions"
        onAction={(key) => changeLanguage(key as string)}
      >
        <DropdownItem key="en" className="text-center">
          en
        </DropdownItem>
        <DropdownItem key="pt" className="text-center">
          pt
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
