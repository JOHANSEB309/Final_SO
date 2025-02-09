import React, { useState } from 'react';
import ProcessForm from './ProcessForm';
import ProcessTable from './ProcessTable';
import GanttChart from './GanttChart';
import MetricsTable from './MetricsTable';
import './FCFS.css';

function App() {
  const [processes, setProcesses] = useState([]);
  const [ganttData, setGanttData] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const addProcess = (process) => {
    setProcesses([...processes, process]);
  };

  const executeProcesses = () => {
    // Lógica para ejecutar los procesos y generar el diagrama de Gantt
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;
    const gantt = [];
    const calculatedMetrics = [];

    sortedProcesses.forEach((process, index) => {
      const startTime = Math.max(currentTime, process.arrivalTime);
      const endTime = startTime + process.executionTime;
      const waitingTime = startTime - process.arrivalTime;
      const returnTime = endTime - process.arrivalTime;
      const lostTime = waitingTime;
      const penalty = returnTime / process.executionTime;
      const responseTime = waitingTime;

      gantt.push({
        process: process.name,
        startTime,
        endTime,
        executionTime: process.executionTime,
        blockStart: process.blockStart,
        blockDuration: process.blockDuration
      });

      calculatedMetrics.push({
        process: process.name,
        returnTime,
        lostTime,
        waitingTime,
        penalty,
        responseTime
      });

      currentTime = endTime;
    });

    setGanttData(gantt);
    setMetrics(calculatedMetrics);
  };

  return (
    <div className="App">
      <h1>Simulación FCFS</h1>
      <ProcessForm addProcess={addProcess} />
      <ProcessTable processes={processes} />
      <button onClick={executeProcesses}>Ejecutar Procesos</button>
      <GanttChart ganttData={ganttData} />
      <MetricsTable metrics={metrics} />
    </div>
  );
}

export default App;