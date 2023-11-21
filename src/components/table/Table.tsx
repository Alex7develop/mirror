import React, { useState } from 'react';
import styles from './Table.module.css';
import type { TableColumn, TableRow } from '../types/types';

interface TableProps {
  data: TableRow[];
  columns: TableColumn[];
  onRowClick: (rowData: TableRow) => void;
}

interface SortConfig {
  key: string;
  direction: 'ascending' | 'descending';
}

const Table: React.FC<TableProps> = ({ data, columns, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const compareValues = (a: string | number, b: string | number): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const sortedData = [...data].sort((a, b) => {
    const key = sortConfig ? sortConfig.key : '';
    const aValue = a[key];
    const bValue = b[key];

    if (sortConfig && sortConfig.direction === 'descending') {
      return compareValues(String(bValue), String(aValue));
    } else {
      return compareValues(String(aValue), String(bValue));
    }
  });

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} onClick={() => handleSort(column.key)}>
              {column.label}
              {sortConfig && sortConfig.key === column.key && (
                <span>
                  {sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id} onClick={() => onRowClick(row)}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
