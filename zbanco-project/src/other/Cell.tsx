import clsx from "clsx";

type CellProps = {
  children: React.ReactNode;
  isOdd?: boolean;
}

const Cell = (props: CellProps) => {
  return (
    <div className={clsx("flex gap-2 items-center p-2 sm:p-4 min-w-[200px] lg:min-w-0", {
      "bg-soft-gray/15": props.isOdd
    })}>
      {props.children}
    </div>
  );
};

export default Cell;