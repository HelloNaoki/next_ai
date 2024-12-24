"use client";
import useCommonStore from "@/store/common";
import useUserStore, { defaultUserInfo } from "@/store/user";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { getUserInfoAction } from "./actions";
import Cookies from "js-cookie";

export function Providers({
  children,
  publicRuntimeConfig,
  lang,
}: {
  children: React.ReactNode;
  publicRuntimeConfig: any;
  lang: string;
}) {
  const { setConfig, setLanguage } = useCommonStore();
  const { setUserInfo } = useUserStore();

  useEffect(() => {
    setConfig(publicRuntimeConfig);
  }, [publicRuntimeConfig]);

  const getUserInfo = async () => {
    const userInfo = await getUserInfoAction();
    setUserInfo(userInfo || defaultUserInfo);
  };

  useEffect(() => {
    getUserInfo();
    setLanguage(lang);
    Cookies.set(
      "theme-config",
      JSON.stringify({
        token: {
          colorPrimary: "#504AFF",
        },
        theme: "light",
      })
    );
  }, []);

  return <NextUIProvider>{children}</NextUIProvider>;
}
