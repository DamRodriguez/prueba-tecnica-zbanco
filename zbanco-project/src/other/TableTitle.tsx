type TableTitleProps = {
  title: string;
}

const TableTitle = (props: TableTitleProps) => {
  return (
    <div className="text-nowrap text-sm sm:text-base p-2 sm:p-4 text-white font-semibold flex items-center bg-gradient-to-r lg:bg-gradient-to-t from-medium-blue/90 to-blue/80">
      {props.title}
    </div>
  );
};

export default TableTitle;