import { MouseEventHandler } from "react";
import Button from "./Button";
import { useModal } from "./Modal";

type ButtonOpenModalProps = {
  buttonType: "primary" | "text-only" | "custom";
  label?: string;
  CustomButton?: React.ReactElement<HTMLButtonElement>;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
};

export default function ButtonOpenModal({
  buttonType,
  label,
  CustomButton,
}: ButtonOpenModalProps) {
  const { setModalIsOpen } = useModal();

  if (buttonType === "primary")
    return <Button onClick={() => setModalIsOpen(true)}>{label}</Button>;

  if (buttonType === "text-only")
    return (
      <Button onClick={() => setModalIsOpen(true)} textOnly>
        {label}
      </Button>
    );

  if (buttonType === "custom" && CustomButton !== undefined) {
    return (
      <div role="button" className="grid" onClick={() => setModalIsOpen(true)}>
        {CustomButton}
      </div>
    );
  }
}
