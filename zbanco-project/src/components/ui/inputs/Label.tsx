import clsx from "clsx";

type LabelProps = {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
  error?: boolean;
  hasValue?: boolean;
};

const Label = ({ htmlFor, children, hasValue }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("text-base leading-[1.3125rem] group-focus-within:text-medium-gray transition-all w-fit", {
        "text-black": hasValue,
        "text-medium-gray": !hasValue,
      })}
    >
      {children}
    </label>
  );
};

export default Label;
