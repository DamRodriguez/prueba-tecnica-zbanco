type TableTitleProps = {
  title: string;
}

const TableTitle = (props: TableTitleProps) => {
  return (
    <div className="text-nowrap text-sm sm:text-base p-2 sm:p-4 text-medium-gray font-semibold bg-blue-light/10 border-b border-r lg:border-r-0 border-soft-gray flex items-center">
      {props.title}
    </div>
  );
};

export default TableTitle;