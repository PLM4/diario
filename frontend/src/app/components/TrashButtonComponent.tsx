"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { deletePost } from "../service/PostService";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";
import DialogBase from "./ui/DialogBase";

export default function TrashButtonComponent({ id }: { id: UUID }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const deletarPostagem = async () => {
    await deletePost(id);
    setVisible(false);
    router.back();
  };

  return (
    <>
      <ButtonComponent title={<Trash2 />} onClick={() => setVisible(true)} />
      <DialogBase
        visible={visible}
        onHide={() => setVisible(false)}
        title="Confirmar exclusão"
        description="Essa ação não pode ser desfeita!"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "flex-start",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <ButtonComponent title="Confirmar" onClick={deletarPostagem} />
          <ButtonComponent title="Cancelar" onClick={() => setVisible(false)} />
        </div>
      </DialogBase>
    </>
  );
}
