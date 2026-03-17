import type { ToastProps } from "./Toast";
import { toast } from "react-toastify";
import Toast from "./Toast";

const showToast = (type: ToastProps["type"], text: ToastProps["text"], manualClose?: ToastProps["manualClose"]) => {
  toast[type](
    ({ closeToast }) => (
      <Toast text={text} type={type} closeToast={closeToast} manualClose={manualClose} />
    ),
    {
      position: "top-left",
      autoClose: 2500,
      closeButton: false,
      className: "top-[1rem]",
    },
  );
};

export default showToast;