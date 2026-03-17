"use client";
import clsx from "clsx";
import type { ReactNode } from "react";
import Spinner from "../../spinner/Spinner";
import { buttonClass, type ButtonVariants } from "./Button.style";

type ButtonProps = {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  spinnerColor?: string;
  className?: string;
  variant?: ButtonVariants;
  outline?: boolean;
  full?: boolean;
  form?: string;
};

const Button = (props: ButtonProps) => {
  const className = clsx(buttonClass({
    intent: props.variant,
    disabled: props.disabled,
    outline: props.outline,
    full: props.full,
  }), props.className);
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
      className={className}
      form={props.form}
    >
      {
        props.isLoading ? (
          <div className="flex gap-x-[1rem] h-[1.3125rem]">
            <Spinner size={1.2} borderWidth={0.15} color={props.spinnerColor} />
          </div>
        ) : (
          props.children
        )
      }
    </button >
  );
};

export default Button;
