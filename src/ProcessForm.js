import React, { useState } from 'react';

function ProcessForm({ addProcess }) {
  const [name, setName] = useState('');
  const [arrivalTime, setArrivalTime] = useState(0);
  const [executionTime, setExecutionTime] = useState(0);
  const [blockStart, setBlockStart] = useState(0);
  const [blockDuration, setBlockDuration] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProcess({ name, arrivalTime, executionTime, blockStart, blockDuration });
    setName('');
    setArrivalTime(0);
    setExecutionTime(0);
    setBlockStart(0);
    setBlockDuration(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del proceso" required />
      <input type="number" value={arrivalTime} onChange={(e) => setArrivalTime(parseInt(e.target.value))} placeholder="Instante de llegada" required />
      <input type="number" value={executionTime} onChange={(e) => setExecutionTime(parseInt(e.target.value))} placeholder="Tiempo de ejecución" required />
      <input type="number" value={blockStart} onChange={(e) => setBlockStart(parseInt(e.target.value))} placeholder="Inicio del bloqueo" required />
      <input type="number" value={blockDuration} onChange={(e) => setBlockDuration(parseInt(e.target.value))} placeholder="Duración del bloqueo" required />
      <button type="submit">Agregar Proceso</button>
    </form>
  );
}

export default ProcessForm;