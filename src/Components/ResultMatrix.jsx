import React from 'react';
import { Grid } from 'react-virtualized';
import './ResultMatrix.css'

function ResultTable({ matrix }) {
  const rowCount = matrix.length;
  const columnCount = matrix[0]?.length || 0;

  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
    return (
      <div key={key} style={style} className="cell">
        {matrix[rowIndex][columnIndex]}
      </div>
    );
  };

  return (
    <div className="result-table-container">
      <Grid
        cellRenderer={cellRenderer}
        columnCount={columnCount}
        columnWidth={100} 
        height={600} 
        rowCount={rowCount}
        rowHeight={40} 
        width={1000} 
      />
    </div>
  );
}

export default ResultTable;
