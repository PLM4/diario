"use client";

import { Dialog } from "primereact/dialog";
import React from "react";

interface DialogBaseProps {
  visible: boolean;
  onHide: () => void;
  title?: string | React.ReactNode;
  description?: string;
  width?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
}

export default function DialogBase({
  visible,
  onHide,
  title,
  description,
  width = "30rem",
  children,
}: DialogBaseProps) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      style={{ width }}
      modal
      header={
        title ? (
          <div>
            {typeof title === "string" ? (
              <h2 className="font-semibold text-lg">{title}</h2>
            ) : (
              title
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1 ">
                {description}
              </p>
            )}
          </div>
        ) : undefined
      }
    >
      {children}
    </Dialog>
  );
}

