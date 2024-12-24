"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import useUserStore from "@/store/user";
import Link from "next/link";
import useCommonStore from "@/store/common";
import { logOutAction } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import showToast from "../Toast";

export const UserCenter = () => {
  const t = useTranslations("common");
  const { setShowModal, setModalType } = useCommonStore();
  const { userInfo, clearUserInfo } = useUserStore();
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsDisabled(true);
    const result = await logOutAction();
    setIsDisabled(false);
    if (result?.returnCode === "0") {
      clearUserInfo();
      showToast(t("logoutSuccess"));
      router.push("/");
      return;
    }
    showToast(result?.errorMessage);
  };

  return (
    <div className="gap-3 nav__item lg:flex ml-auto lg:ml-0 lg:order-2">
      <div className="flex nav__item">
        {userInfo?.token ? (
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  className="cursor-pointer"
                  color="primary"
                  src="/img/avatar.png"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  textValue="Profile"
                >
                  <p className="font-bold">{userInfo?.userId}</p>
                </DropdownItem>
                <DropdownItem key="personal" textValue="Personal Center">
                  <Link href="/personal">{t("personalCenter")}</Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  textValue="Log Out"
                  isDisabled={isDisabled}
                  onClick={() => handleSignOut()}
                >
                  {isDisabled ? <Spinner size="sm" /> : t("sign_out")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
          <>
            <a
              onClick={() => setShowModal(true)}
              className="py-2 rounded-md md:ml-5 hover:primary cursor-pointer"
            >
              {t("sign_in")}
            </a>
            <span className="py-2 rounded-md ml-1 md:ml-5">/</span>
            <a
              onClick={() => {
                setShowModal(true);
                setModalType("register");
              }}
              target="_blank"
              className="py-2 rounded-md ml-1 md:ml-5 hover:primary cursor-pointer"
            >
              {t("register")}
            </a>
          </>
        )}
      </div>
    </div>
  );
};
