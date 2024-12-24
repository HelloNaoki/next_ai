"use client";
import Iframe from "@/components/Iframe";
import useCommonStore from "@/store/common";
import React from "react";
import { useEffect } from "react";

export default function Docs({ params }: { params: any }) {
  const name = React.use<{ name: string }>(params)?.name;

  const { config, getTermsConfig, termsConfig, language } = useCommonStore();

  useEffect(() => {
    getTermsConfig();
  }, []);
  return (
    <Iframe
      path={`${config.DOCS_URL}/docs/${termsConfig[name]?.[language]?.url}`}
    />
  );
}
