import React from 'react';

import { TableCellData } from '../table';

type Props = {
  rowData: TableCellData[];
  classNamePrefix?: string;
};

const TableRow = ({ rowData, classNamePrefix }: Props) => {
  const rowDataMapCallback = (data: TableCellData) => {
    if (data.isHeading) {
      return (
        <th className={classNamePrefix ? `${classNamePrefix}__heading` : undefined} key={data.data}>
          {data.data}
        </th>
      );
    } else {
      return (
        <td className={classNamePrefix ? `${classNamePrefix}__cell` : undefined} key={'key' in data ? data.key : data.data}>
          {data.data}
        </td>
      );
    }
  };

  return <tr className={classNamePrefix ? `${classNamePrefix}__row` : undefined}>{rowData.map(rowDataMapCallback)}</tr>;
};

export default TableRow;
