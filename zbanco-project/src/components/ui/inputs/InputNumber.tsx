import type { RefCallBack } from "react-hook-form";
import Input from "./input/Input";
import clsx from "clsx";

export type InputNumberProps = {
  name?: string;
  placeholder?: string;
  maxLength?: number;
  id?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  disabled?: boolean;
  ref?: RefCallBack;
  autoComplete?: string;
  error?: boolean;
  mode?: "decimal" | "numeric";
  className?: string;
  leftItem?: React.ReactNode;
};

export const InputNumber = ({
  name,
  placeholder,
  maxLength,
  id,
  ref,
  value = "",
  onFocus,
  onBlur,
  onChange,
  disabled,
  autoComplete,
  error,
  className,
  mode = "numeric",
  leftItem
}: InputNumberProps) => {

  const formatNumber = (val: string) => {
    if (!val) return "";
    const n = parseInt(val, 10);
    return isNaN(n) ? "" : n.toLocaleString("es-AR");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    let cleanedValue = inputValue.replace(/\D+/g, "");

    if (maxLength !== undefined && cleanedValue.length > maxLength) {
      cleanedValue = cleanedValue.slice(0, maxLength);
    }

    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: cleanedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  return (
    <div className="relative">
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        name={name}
        ref={ref}
        value={formatNumber(value)}
        maxLength={maxLength ? maxLength + Math.floor(maxLength / 3) : undefined}
        disabled={disabled}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autoComplete={autoComplete}
        error={error}
        inputMode={mode}
        className={clsx("", className, {
          "pl-8 sm:pl-9": leftItem
        })}
      />
      {leftItem && (
        <div className={clsx("absolute top-1/2 -translate-y-1/2 mx-[1rem] text-sm sm:text-base", {
          "text-soft-gray": !value
        })}>
          {leftItem}
        </div>
      )}
    </div>
  );
};