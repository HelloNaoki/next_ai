"use client";
import { debounce } from "@/utils";
import { Spinner } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";

export default function Iframe({
  path,
  below,
}: {
  path: string;
  below?: number;
}) {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const listenerHeight = (iframe: HTMLIFrameElement) => {
    window.addEventListener("message", (event) => {
      if (event.data.type !== "reSize") return;
      const { height } = event.data;
      iframe.height = height;
    });
  };

  const handleLoad = (iframe: HTMLIFrameElement) => {
    if (iframe) {
      const observer = new ResizeObserver(
        debounce((entries) => {
          for (let entry of entries) {
            const newHeight = entry.contentRect.height;
            iframe.style.height = `${newHeight + (below || 100)}px`;
          }
        }, 100)
      );

      const adjustIframeHeight = () => {
        try {
          const body = iframe.contentWindow?.document.body;
          if (body) {
            observer.observe(body);
          }
        } catch (error) {
          console.log(error);
          iframe.style.height = "60vh";
        }
      };

      const handleLoad = () => {
        adjustIframeHeight();
        setLoading(false);
      };

      iframe.onload = handleLoad;

      // 强制刷新 iframe
      iframe.src = path; // 添加时间戳以避免缓存

      return () => {
        observer.disconnect(); // 清理 ResizeObserver
      };
    }
  };

  useEffect(() => {
    const iframe = iframeRef?.current;
    listenerHeight(iframe!);
    handleLoad(iframe!);
  }, [path]);

  return (
    <>
      {loading && (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        className={loading ? "invisible fixed" : ""}
        id="iframe-content"
        width="100%"
        height="400px"
      />
    </>
  );
}
