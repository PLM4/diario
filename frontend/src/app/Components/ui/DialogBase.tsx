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
}

export default function DialogBase({
  visible,
  onHide,
  title,
  description,
  width = "32rem",
  children,
}: DialogBaseProps) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modal
      style={{ width }}
      header={
        title ? (
          <div className="border-b border-gray-200">
            {typeof title === "string" ? (
              <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                {title}
              </h2>
            ) : (
              title
            )}

            {description && (
              <p className="mt-5 text-lg text-gray-500 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        ) : undefined
      }
    >
      <div className="">{children}</div>
    </Dialog>
  );
}
