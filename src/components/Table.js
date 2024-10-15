import React from 'react';
import '../App.css';

function Table({ data, columns, columnTitles, renderButton }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{columnTitles[column] || column}</th>
          ))}
          {renderButton && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
            {renderButton && (
              <td>
                {renderButton(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
