"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "/public/logo.png";
import cart from "/public/img/shopping-cart.png";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Divider
} from "@nextui-org/react";
import { UserCenter } from "./UserCenter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCommonStore from "@/store/common";
import useUserStore from "@/store/user";
import Locale from "./Locale";
import { useTranslations } from "next-intl";
import { usePathname} from "next/navigation"

export default function Nav() {
  const t = useTranslations("common");
  const pathname = usePathname()
  

  const navigation = [
    {
      name: t("home"),
      href: "/",
    },
    {
      name: t("parity"),
      href: "/parity",
    },
    {
      name: t("Instance"),
      href: "/examples",
    },
    {
      name: t("contact_us"),
      href: "/#contact",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { setShowModal } = useCommonStore();
  const { userInfo } = useUserStore();
  const handleLinkClick = (url: string) => {
    setIsMenuOpen(false);
    if (url === "/pricing" && !userInfo.token) {
      setShowModal(true);
      return;
    }
    router.push(url);
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      height={"5rem"}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          className="md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              quality={100}
              width={120}
              layout="fixed"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-6" justify="center">
        {navigation.map((menu) => (
          <NavbarItem key={menu.name}>
            <div
              onClick={() => handleLinkClick(menu.href)}
              className="cursor-pointer inline-block px-4 py-2 text-md font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-primary focus:text-primary focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800 uppercase"
            >
             <span className={pathname === menu.href ? "text-primary" : ""}>{menu.name}</span> 
            </div>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Locale />
        </NavbarItem>
        <NavbarItem className={!userInfo.token ? "hidden" : ""}>
          <Image
            alt="logo"
            quality={32}
            width={32}
            onClick={() => handleLinkClick("/cart")}
            src={cart}
            className="cursor-pointer"
          />
        </NavbarItem>
        <NavbarItem>
          <UserCenter />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navigation.map((menu) => (
          <NavbarMenuItem key={menu.name}>
            <div
              onClick={() => handleLinkClick(menu.href)}
              className="cursor-pointer w-full inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:primary focus:primary focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800 uppercase"
            >
              <span className={pathname === menu.href ? "text-primary" : ""}>{menu.name}</span> 
            </div>
            <Divider />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
