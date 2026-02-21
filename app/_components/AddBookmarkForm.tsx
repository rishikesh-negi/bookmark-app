"use client";

import {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  useActionState,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { createBookmarkAction, type FormState } from "../_lib/actions";
import { APP_TOAST_ID } from "../_lib/helpers";
import AppToast from "./ui/AppToast";
import ButtonCloseModal from "./ui/ButtonCloseModal";
import Input from "./ui/Input";
import { useModal } from "./ui/Modal";
import SubmitActionButton from "./ui/SubmitActionButton";

type AddBookmarkFormProps = ComponentPropsWithoutRef<"form">;

export default function AddBookmarkForm(props: AddBookmarkFormProps) {
  const { setModalIsOpen } = useModal();
  const [formError, setFormError] = useState<string | null>(null);

  const initialState: FormState = { status: "idle" };
  const [state, formAction, isPending] = useActionState(
    async (prevState: FormState, formData: FormData) => {
      const { status, message } = await createBookmarkAction(
        prevState,
        formData,
      );

      if (status === "success") {
        formRef.current?.reset();
        setModalIsOpen(false);
        toast.custom(
          (t) => (
            <AppToast
              isVisible={t.visible}
              type="success"
              message={message || "Bookmark successfully created"}
              toastId={t.id}
            />
          ),
          { duration: 5000, id: APP_TOAST_ID },
        );
      }

      if (status === "fail") {
        toast.custom(
          (t) => (
            <AppToast
              isVisible={t.visible}
              type="fail"
              message={message!}
              toastId={t.id}
            />
          ),
          { duration: 5000, id: APP_TOAST_ID },
        );
      }

      if (status === "error") setFormError(message || "Something went wrong!");

      return { status, message };
    },
    initialState,
  );

  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseFormModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    formRef.current?.reset();
    setModalIsOpen(false);
  };

  return (
    <form
      action={formAction}
      ref={formRef}
      className="min-w-lg flex flex-col gap-4 items-center mt-6"
      {...props}>
      <ButtonCloseModal onClick={handleCloseFormModal} />
      <Input
        type="text"
        id="title"
        name="title"
        max={80}
        min={2}
        label="Title"
        className="px-4 py-2 rounded-sm bg-slate-300 w-full"
      />

      <Input
        type="url"
        id="url"
        name="url"
        label="URL"
        className="px-4 py-2 rounded-sm bg-slate-300 w-full"
      />
      <div className="w-full flex items-center gap-4 mt-4">
        <SubmitActionButton isPending={isPending} buttonText="Add bookmark">
          Add bookmark
        </SubmitActionButton>
        {formError && <span className="text-sm text-red-700">{formError}</span>}
      </div>
    </form>
  );
}
