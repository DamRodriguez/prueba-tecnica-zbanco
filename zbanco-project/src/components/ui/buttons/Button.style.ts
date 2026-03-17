import { tv } from "tailwind-variants";

export const buttonClass = tv({
  base: "text-base sm:text-lg leading-[1.5rem] font-semibold tracking-[-0.04375rem] py-[0.62rem] px-[1.62rem] rounded-[0.375rem] flex items-center justify-center cursor-pointer min-h-[2.75rem]",
  variants: {
    intent: {
      primary: "bg-blue text-white",
      secondary: "bg-red-100 text-neutral-100",
      tertiary: "bg-transparent border border-neutral-1000",
      quaternary: "bg-primary-300 text-neutral-1000",
      quintary: "bg-neutral-100 text-neutral-100",
    },
    disabled: {
      true: "cursor-not-allowed !bg-soft-gray",
      false: "",
    },
    outline: {
      true: "bg-transparent border",
      false: "",
    },
    full: {
      true: "w-full",
      false: "",
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      outline: true,
      class: "border-secondary-300 text-secondary-300 [&_svg]:stroke-secondary-300",
    },
    {
      intent: "secondary",
      outline: true,
      class: "border-[#FB3748] text-[#FB3748]",
    },
    {
      intent: "quaternary",
      outline: true,
      class: "border-primary-300 text-primary-300 [&_svg]:stroke-primary-300",
    },
    {
      intent: "quintary",
      outline: true,
      class: "border-neutral-100",
    },
  ],
  defaultVariants: {
    intent: "primary",
    disabled: false,
    outline: false,
    full: false,
  },
}
);

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "quintary";