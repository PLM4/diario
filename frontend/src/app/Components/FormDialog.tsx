import DialogBase from "./ui/DialogBase";
import Form from "./Form";
import { UUID } from "crypto";

export function FormDialog({
  visible,
  onHide,
  postId,
}: {
  visible: boolean;
  onHide: () => void;
  postId?: UUID;
}) {
  const isEdit = !!postId;

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">
        {isEdit ? "Editar post" : "Novo registro"}
      </span>
    </div>
  );

  return (
    <DialogBase
      visible={visible}
      onHide={onHide}
      title={headerElement}
      width="40rem"
    >
      <Form closeDialog={onHide} postId={postId} />
    </DialogBase>
  );
}
