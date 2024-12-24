"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalProps["size"];
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      radius="sm"
      shadow="sm"
      size={size || "xl"}
      onClose={() => onClose()}
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        {children}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
