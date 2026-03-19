import { tv } from "tailwind-variants"

export const inputClass = tv({
  base: "border rounded-md min-h-[2.5rem] py-[0.5rem] px-[1rem] focus:border-black group-focus-within:border-black outline-none transition-all text-sm sm:text-lg text-soft-gray bg-transparent placeholder:text-soft-gray placeholder:text-xs sm:placeholder:text-sm shadow-s1",
  variants: {
    intent: {
      default: "border-soft-gray",
    },
    size: {
      small: "",
      large: "w-full",
    },
    disabled: {
      true: "cursor-not-allowed",
    },
    hasValue: {
      true: "border-black text-black",
    },
    hasError: {
      true: "border-red-error/50",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "large",
  }
})