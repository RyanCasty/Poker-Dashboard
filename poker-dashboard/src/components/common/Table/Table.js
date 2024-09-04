import React from 'react';
import { useTable } from 'react-table';
import './Table.css';

function MyTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px black', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                const isNetProfit = cell.column.id === 'netEarnings'; // Ensure 'netProfit' is the correct accessor
                const netProfitValue = parseFloat(cell.value);

                return (
                  <td
                    {...cell.getCellProps()}
                    className={isNetProfit ? 
                      (netProfitValue > 0 ? 'net-profit-positive' : 'net-profit-negative') 
                      : ''
                    }
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MyTable;
