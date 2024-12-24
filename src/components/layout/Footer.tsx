"use client";
import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import useCommonStore from "@/store/common";
import logo from "/public/logo.png";

export function Footer() {
  const { termsConfig, getTermsConfig, config, language } = useCommonStore();

  useEffect(() => {
    if (!config.APP_ID) return;
    getTermsConfig();
  }, [config]);

  return (
    <div className="relative">
      <Divider className="mt-10" />
      <Container className="max-w-screen-xl">
        <div className="flex w-full flex-col sm:grid sm:grid-cols-2 items-center">
          <div>
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={60}
              layout="fixed"
            />
            {config.SERVER_EMAIL && (
              <p className="mb-4 mt-2">
                <strong className="font-medium">Email:</strong>
                <a href={`mailto:${config.SERVER_EMAIL}`}>
                  {config.SERVER_EMAIL}
                </a>
              </p>
            )}
          </div>
          <div className="flex justify-between flex-wrap">
            {Object.keys(termsConfig).map((key) => (
              <div className="my-2" key={key}>
                <Link
                  key={key}
                  className={"hover:text-primary cursor-pointer transition-all"}
                  href={`/docs/${key}`}
                >
                  {termsConfig[key]?.[language]?.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
