import React, { useState } from 'react';
import styles from './FilterAndDetails.module.css';
import { TableRow } from '../types/types';

interface FilterAndDetailsProps {
  onFilter: (filterText: string) => void;
  detailsData: TableRow | null;
}

const FilterAndDetails: React.FC<FilterAndDetailsProps> = ({
  onFilter,
  detailsData,
}) => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleFilterClick = () => {
    onFilter(filterText);
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="Введите текст для фильтрации"
          value={filterText}
          onChange={handleFilterChange}
        />
        <button className={styles.filterButton} onClick={handleFilterClick}>
          Найти
        </button>
      </div>
      <div>
        {detailsData && (
          <div>
            <h4>Дополнительные данные:</h4>
            <pre>
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(detailsData).filter(
                    ([key]) => key !== 'description')),null,2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterAndDetails;
