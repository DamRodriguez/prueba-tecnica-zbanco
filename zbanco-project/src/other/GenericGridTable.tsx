import clsx from 'clsx';
import TableTitle from './TableTitle';
import Cell from './Cell';

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
  //tiene errores con las clases dinamicas con colCount
  const colCount = columns.length;

  const dynamicStyles = {
    '--col-count': colCount,
  } as React.CSSProperties;

  return (
    <div className="border border-soft-gray rounded-md scrollbarHorizontal scrollbarCustom lg:h-[20rem] overflow-auto">
      <div
        className={clsx(
          "min-h-[13rem] grid grid-flow-col lg:grid-flow-row min-w-max lg:min-w-full",
          "grid-rows-[repeat(var(--col-count),_auto)]",
          "lg:grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))]"
        )}
        style={dynamicStyles}
      >

        <div
          className="contents lg:grid h-[2rem] lg:col-span-[var(--col-count)] lg:grid-cols-subgrid"
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
        >
          {columns.map((col, idx) => (
            <TableTitle key={idx} title={col.header} />
          ))}
        </div>

        {!isLoading && data.map((item, index) => (
          <div
            key={index}
            className="contents lg:grid lg:col-span-[var(--col-count)]"
            style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          >
            {columns.map((col, idx) => (
              <Cell key={idx}>
                {col.render(item)}
              </Cell>
            ))}
          </div>
        ))}

        {!isLoading && data.length === 0 && (
          <p
            className="flex justify-center items-center p-4 row-span-full lg:row-span-1 lg:pt-7 text-xs sm:text-base text-medium-gray"
            style={{ gridColumn: `span ${colCount}` }}
          >
            {emptyMessage}
          </p>
        )}

        {isLoading && (
          <p
            className="flex justify-center items-center p-4"
            style={{ gridColumn: `span ${colCount}` }}
          >
            Cargando...
          </p>
        )}
      </div>
    </div>
  );
};

export default GenericGridTable;