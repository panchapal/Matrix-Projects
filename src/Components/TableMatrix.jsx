import React from 'react';
import { Grid } from 'react-virtualized';
import './TableMatrix.css'

const MatrixTable = ({ matrix, onChange, rows, columns }) => {
  const handleInputChange = (rowIndex, columnIndex, value) => {
    const newValue = isNaN(value) ? matrix[rowIndex][columnIndex] : parseFloat(value);
    onChange(rowIndex, columnIndex, newValue);
  };

  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
    return (
      <div
        key={key}
        style={style}
        className="cell"
      >
        <input
          type="number"
          value={matrix[rowIndex][columnIndex]}
          onChange={(e) => handleInputChange(rowIndex, columnIndex, e.target.value)}
        />
      </div>
    );
  };

  return (
    <Grid
      cellRenderer={cellRenderer}
      columnCount={columns}
      columnWidth={80}  
      height={400}      
      rowCount={rows}
      rowHeight={60}  
      width={800}      
    />
  );
};

export default MatrixTable;
