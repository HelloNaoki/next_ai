"use client";
import React, { createContext, useContext, useState } from "react";
import BaseModal from "@/components/BaseModal";
import { ModalProps } from "@nextui-org/react";

interface ModalContextType {
  openModal: (
    title?: string,
    content?: React.ReactNode,
    size?: ModalProps["size"]
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title?: string;
    content?: React.ReactNode;
    size?: ModalProps["size"];
  }>({});

  const openModal = (
    title?: string,
    content?: React.ReactNode,
    size?: ModalProps["size"]
  ) => {
    setModalContent({ title, content, size });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <BaseModal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalContent.title}
        size={modalContent.size}
      >
        {modalContent.content}
      </BaseModal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
