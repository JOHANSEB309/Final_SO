import React from 'react';

function ProcessTable({ processes }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Proceso</th>
          <th>Instante de llegada</th>
          <th>Ejecución</th>
          <th>Inicio del bloqueo</th>
          <th>Duración del bloqueo</th>
        </tr>
      </thead>
      <tbody>
        {processes.map((process, index) => (
          <tr key={index}>
            <td>{process.name}</td>
            <td>{process.arrivalTime}</td>
            <td>{process.executionTime}</td>
            <td>{process.blockStart}</td>
            <td>{process.blockDuration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProcessTable;