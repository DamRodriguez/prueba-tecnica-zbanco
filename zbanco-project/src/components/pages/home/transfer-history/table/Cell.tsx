type CellProps = {
  children: React.ReactNode
}

const Cell = (props: CellProps) => {
  return (
    <div className="flex gap-2 items-center p-2 sm:p-4 border-b border-r lg:border-r-0 border-soft-gray min-w-[200px] lg:min-w-0">
      {props.children}
    </div>
  );
};

export default Cell;