"use client";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import useCommonStore from "@/store/common";
import Iframe from "../Iframe";

export default function LoginModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { showModal, modalType, setShowModal, setModalType } = useCommonStore();

  useEffect(() => {
    if (showModal) onOpen();
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
    onClose();
    setModalType("");
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const { type, code } = event.data;
      if (type !== "login" || code !== "0") return;
      closeModal();
      window.location.reload();
    });
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        radius="sm"
        shadow="sm"
        onOpenChange={onOpenChange}
        onClose={() => closeModal()}
        placement="center"
      >
        <ModalContent className="min-h-[400px] max-h-[800px] overflow-hidden pb-4">
          <Iframe path={`/user/${modalType || "login"}`} below={1} />
        </ModalContent>
      </Modal>
    </>
  );
}
