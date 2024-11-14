import React, { useState } from 'react';
import './Matrix.css';
import MatrixTable from './TableMatrix';
import ResultTable from './ResultMatrix';

function Matrix() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [resultMatrix, setResultMatrix] = useState(null);

  const handleGenerate = () => {
    const newMatrixA = [];
    const newMatrixB = [];

    for (let i = 0; i < rows; i++) {
      const rowA = [];
      const rowB = [];
      for (let j = 0; j < columns; j++) {
        rowA.push(i + j);
        rowB.push(i * j);
      }
      newMatrixA.push(rowA);
      newMatrixB.push(rowB);
    }
    setMatrixA(newMatrixA);
    setMatrixB(newMatrixB);
    setResultMatrix(null);
  };

  const handleMatrixChange = (matrix, row, col, value) => {
    const newMatrix = matrix.map((r) => [...r]);
    newMatrix[row][col] = value;
    if (matrix === matrixA) {
      setMatrixA(newMatrix);
    } else {
      setMatrixB(newMatrix);
    }
  };

  const handleOperation = (operation) => {
    const result = [];
    for (let i = 0; i < rows; i++) {
      const resultRow = [];
      for (let j = 0; j < columns; j++) {
        const a = matrixA[i][j] ?? 0; 
        const b = matrixB[i][j] ?? 0; 
        let cellResult;
        if (operation === 'add') {
          cellResult = a + b;
        } else if (operation === 'subtract') {
          cellResult = a - b;
        } else if (operation === 'multiply') {
          cellResult = a * b;
        } else {
          cellResult = 0;
        }
        resultRow.push(cellResult);
      }
      result.push(resultRow);
    }
    setResultMatrix(result);
  };

  const handleRowChange = (e) => {
    setRows(+e.target.value);
    setMatrixA([]);
    setMatrixB([]);
    setResultMatrix(null);
  };

  const handleColumnChange = (e) => {
    setColumns(+e.target.value);
    setMatrixA([]);
    setMatrixB([]);
    setResultMatrix(null);
  };

  return (
    <div>
      <h1>Matrix Operations</h1>
      <input
        type="number"
        placeholder="Rows"
        onChange={handleRowChange}
      />
      <input
        type="number"
        placeholder="Columns"
        onChange={handleColumnChange}
      />
      <button onClick={handleGenerate}>Generate Tables</button>

      <div className="matrix-container">
        <div className="matrix-section">
          <h2>Matrix A</h2>
          {matrixA.length > 0 && (
            <MatrixTable
              matrix={matrixA}
              onChange={(row, col, value) => handleMatrixChange(matrixA, row, col, +value)}
              rows={rows}
              columns={columns}
            />
          )}
        </div>
        <div className="matrix-section">
          <h2>Matrix B</h2>
          {matrixB.length > 0 && (
            <MatrixTable
              matrix={matrixB}
              onChange={(row, col, value) => handleMatrixChange(matrixB, row, col, +value)}
              rows={rows}
              columns={columns}
            />
          )}
        </div>
      </div>

      <div className="result-section">
        <button onClick={() => handleOperation('add')}>Add Matrices</button>
        <button onClick={() => handleOperation('subtract')}>Subtract Matrices</button>
        <button onClick={() => handleOperation('multiply')}>Multiply Matrices</button>

        {resultMatrix && (
          <div>
            <h2>Result Matrix</h2>
            <ResultTable matrix={resultMatrix} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Matrix;
