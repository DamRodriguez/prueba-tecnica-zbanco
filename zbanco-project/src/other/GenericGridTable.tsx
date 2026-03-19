import React from 'react';
import Cell from '../components/pages/home/transfer-history/table/Cell';
import TableTitle from '../components/pages/home/transfer-history/table/TableTitle';
import clsx from 'clsx';

interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface GenericGridTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  isLoading?: boolean;
}

const GenericGridTable = <T,>({
  data,
  columns,
  emptyMessage = "No hay datos disponibles",
  isLoading
}: GenericGridTableProps<T>) => {
  const colCount = columns.length;

  const gridRowsClass = `grid-rows-${colCount}`;
  const gridColsClass = `lg:grid-cols-${colCount}`;
  const colSpanClass = `lg:col-span-${colCount}`;

  return (
    <div className="border border-soft-gray rounded-md scrollbarHorizontal scrollbarCustom lg:h-[20rem] overflow-auto">
      <div className={clsx(
        "min-h-[13rem] grid grid-flow-col lg:grid-flow-row min-w-max lg:min-w-full",
        gridRowsClass,
        gridColsClass
      )}>

        <div className={clsx("contents lg:grid h-[2rem]", gridColsClass, colSpanClass)}>
          {columns.map((col, idx) => (
            <TableTitle key={idx} title={col.header} />
          ))}
        </div>

        {!isLoading && data.map((item, index) => (
          <div key={index} className={clsx("contents lg:grid", gridColsClass, colSpanClass)}>
            {columns.map((col, idx) => (
              <Cell key={idx}>
                {col.render(item)}
              </Cell>
            ))}
          </div>
        ))}

        {!isLoading && data.length === 0 && (
          <p className={clsx(
            "flex justify-center items-center p-4 row-span-full lg:row-span-1 lg:pt-7 text-xs sm:text-base text-medium-gray",
            colSpanClass
          )}>
            {emptyMessage}
          </p>
        )}

        {isLoading && (
          <p className={clsx("flex justify-center items-center p-4", colSpanClass)}>
            Cargando...
          </p>
        )}
      </div>
    </div>
  );
};

export default GenericGridTable;