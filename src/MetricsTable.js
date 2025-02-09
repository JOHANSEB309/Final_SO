import React from 'react';

function MetricsTable({ metrics }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Proceso</th>
          <th>Retorno</th>
          <th>Tiempo perdido</th>
          <th>Tiempo de espera</th>
          <th>Penalidad</th>
          <th>Tiempo de respuesta</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric, index) => (
          <tr key={index}>
            <td>{metric.process}</td>
            <td>{metric.returnTime}</td>
            <td>{metric.lostTime}</td>
            <td>{metric.waitingTime}</td>
            <td>{metric.penalty.toFixed(2)}</td>
            <td>{metric.responseTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MetricsTable;