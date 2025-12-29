import DialogBase from "./ui/DialogBase";
import Form from "./Form";

export function FormDialog({
  visible,
  onHide,
}: {
  visible: boolean;
  onHide: () => void;
}) {
  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Novo registro</span>
    </div>
  );

  return (
    <DialogBase
        visible={visible}
        onHide={onHide}
        title={headerElement}
        width="40rem"
    >
      <Form closeDialog={onHide} />
    </DialogBase>
  );
}
