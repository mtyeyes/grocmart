import React, { ReactChild } from 'react';

import TableRow from './table-row/table-row';

interface Props {
  tableData: TableData;
  classNamePrefix?: string;
}

export type TableData = TableRowData[];

type TableRowData = TableCellData[];

export type TableCellData = TableCellWithPrimitiveData | TableCellWithComponent;

interface TableCellWithPrimitiveData {
  isHeading: boolean;
  data: string | number;
}

interface TableCellWithComponent {
  isHeading: false;
  data: ReactChild;
  key: string;
}

const Table = ({ tableData, classNamePrefix }: Props) => {
  const tableDataMapCallback = (tableRowData: TableRowData) => {
    return (
      <TableRow
        rowData={tableRowData}
        classNamePrefix={classNamePrefix ? classNamePrefix : undefined}
        key={'key' in tableRowData[0] ? tableRowData[0].key : tableRowData[0].data}
      />
    );
  };

  return (
    <table className={classNamePrefix ? `${classNamePrefix}` : undefined}>
      <tbody className={classNamePrefix ? `${classNamePrefix}__body` : undefined}>{tableData.map(tableDataMapCallback)}</tbody>
    </table>
  );
};

export default Table;
