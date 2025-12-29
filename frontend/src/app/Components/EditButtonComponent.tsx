"use client";

import { Edit2 } from "lucide-react";
import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { UUID } from "crypto";
import { FormDialog } from "./FormDialog";

export default function EditButtonComponent({ id }: { id: UUID }) {
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <>
      <ButtonComponent
        title={<Edit2 />}
        onClick={() => setDialogVisible(true)}
      />

      <FormDialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        postId={id}
      />
    </>
  );
}
