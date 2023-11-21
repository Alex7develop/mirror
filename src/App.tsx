import React, { useState } from 'react';
import axios from 'axios';
import Table from './components/table/Table';
import FilterAndDetails from './components/filter/FilterAndDetails';
import styles from './App.module.css';
import type { TableColumn, TableRow } from '../src/components/types/types';

const App: React.FC = () => {
  const [data, setData] = useState<TableRow[]>([]);
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);
  const [detailsData, setDetailsData] = useState<TableRow | null>(null);

  const columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get<TableRow[]>(
        'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const handleRowClick = (rowData: TableRow) => {
    setDetailsData(rowData);
  };

  const handleFilter = (filterText: string) => {
    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setDetailsData(null);
  };

  return (
    <div className={styles.container}>
      <h1>Mirror App Таблица</h1>
      <button className={styles.button} onClick={fetchData}>
        Загрузить данные
      </button>
      <FilterAndDetails onFilter={handleFilter} detailsData={detailsData} />
      <Table
        data={filteredData}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default App;
