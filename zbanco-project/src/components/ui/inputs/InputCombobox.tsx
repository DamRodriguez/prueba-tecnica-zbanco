import { useEffect, useRef, useState } from "react";
import type { RefCallBack } from "react-hook-form";
import clsx from "clsx";
import { inputClass } from "./input/Input.style";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { DownArrowIcon, UpArrowIcon } from "../../../icons/header";
import OptionContent from "../../../other/OptionContent";
import { MotionHeight } from "../../motion/MotionHeight";
import { AnimatePresence } from "framer-motion";
import "../../../styles/scrollbarVertical.css"

export type ComboboxOption = {
  id: string;
  image: string;
  name: string;
  accountType: string;
  accountNumber: string;
  balance: string | undefined;
};

export type InputComboboxProps = {
  name?: string;
  options: ComboboxOption[];
  value?: ComboboxOption;
  onChange?: (option: ComboboxOption) => void;
  ref?: RefCallBack;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  placeholder?: string;
};

export const InputCombobox = ({
  name,
  options,
  value,
  onChange,
  ref,
  disabled,
  className,
  error,
  placeholder,
}: InputComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ComboboxOption | undefined>(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    if (value && value.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(value);
    } else {
      setSelected(undefined);
    }
  }, [value]);

  const handleSelect = (option: ComboboxOption) => {
    setSelected(option);
    onChange?.(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(o => o.id !== selected?.id);

  const getArrowIconClassName = () => {
    const defaultClassName = "w-4 h-4";
    if (value?.id || isOpen) return `fill-black ${defaultClassName}`;
    return `fill-soft-gray ${defaultClassName}`
  }

  return (
    <div
      ref={wrapperRef}
      className={clsx("relative w-full", className)}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(prev => !prev)}
        className={clsx(inputClass({
          hasError: error,
          hasValue: value?.id !== undefined,
          disabled: disabled,
        }), className,
          "flex items-center justify-between cursor-pointer"
        )}
      >
        {selected ? (
          <OptionContent option={selected} />
        ) : (
          <>
            {placeholder && (
              <span className="text-soft-gray text-xs sm:text-sm">
                {placeholder}
              </span>
            )}
          </>
        )}

        <>
          {isOpen ? (
            <UpArrowIcon className={getArrowIconClassName()} />
          ) : (
            <DownArrowIcon className={getArrowIconClassName()} />
          )}
        </>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-md overflow-hidden shadow-s2">
            <MotionHeight>
              <div className="max-h-[10.5rem] sm:max-h-[15.5rem] scrollbarCustom overflow-y-auto">
                {filteredOptions.map(option => {
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      className="py-[0.5rem] px-[1rem] hover:bg-black/10"
                    >
                      <OptionContent option={option} />
                    </div>
                  )
                })}
              </div>
            </MotionHeight>
          </div>
        )}
      </AnimatePresence>

      <input
        type="hidden"
        name={name}
        ref={ref}
        value={selected?.id || undefined}
      />
    </div>
  );
};