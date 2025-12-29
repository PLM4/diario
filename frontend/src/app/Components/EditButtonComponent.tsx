"use client";

import { Edit2 } from "lucide-react";
import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useRouter } from "next/navigation";
import DialogBase from "./ui/DialogBase";
import { editarPostagem } from "../service/PostService";
import { UUID } from "crypto";

export default function TrashButtonComponent({ id }: { id: UUID }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const editaPostagem = async () => {
    await editarPostagem(id);
    setVisible(false);
    router.back();
  };

  return (
    <>
      <ButtonComponent
        title={<Edit2 />}
        onClick={() => setVisible(true)}
      />

     <DialogBase
        visible={visible}
        onHide={() => setVisible(false)}
        title="Confirmar edição"
        description="Deseja confirmar a edição desta postagem?"
        onConfirm={editaPostagem}
    >
        <ButtonComponent 
            title="Confirmar"
            onClick={editaPostagem}
        />
    </DialogBase>
    </>
  );
}
