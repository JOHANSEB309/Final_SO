import React, { useState } from "react";

const FCFS = () => {
  const [processes, setProcesses] = useState([]);
  const [newProcess, setNewProcess] = useState({
    id: "",
    arrival: 0,
    execution: 0,
    blockStart: 0,
    blockDuration: 0,
  });

  const [chartData, setChartData] = useState([]);

  const addProcess = () => {
    setProcesses([...processes, { ...newProcess, id: processes.length + 1 }]);
    setNewProcess({
      id: "",
      arrival: 0,
      execution: 0,
      blockStart: 0,
      blockDuration: 0,
    });
  };

  const simulateFCFS = () => {
    let time = 0;
    const results = [];

    processes
      .sort((a, b) => a.arrival - b.arrival)
      .forEach((process) => {
        const start = Math.max(time, process.arrival);
        const blockEnd = process.blockStart + process.blockDuration;
        const end = start + process.execution;

        results.push({
          process: process.id,
          start,
          blockStart: process.blockStart,
          blockEnd,
          end,
        });

        time = end;
      });

    setChartData(results);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Simulación FCFS</h1>

      {/* Formulario para agregar procesos */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <input
          type="number"
          placeholder="Llegada"
          className="border p-2"
          value={newProcess.arrival}
          onChange={(e) =>
            setNewProcess({ ...newProcess, arrival: parseInt(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Ejecución"
          className="border p-2"
          value={newProcess.execution}
          onChange={(e) =>
            setNewProcess({
              ...newProcess,
              execution: parseInt(e.target.value),
            })
          }
        />
        <input
          type="number"
          placeholder="Inicio Bloqueo"
          className="border p-2"
          value={newProcess.blockStart}
          onChange={(e) =>
            setNewProcess({
              ...newProcess,
              blockStart: parseInt(e.target.value),
            })
          }
        />
        <input
          type="number"
          placeholder="Duración Bloqueo"
          className="border p-2"
          value={newProcess.blockDuration}
          onChange={(e) =>
            setNewProcess({
              ...newProcess,
              blockDuration: parseInt(e.target.value),
            })
          }
        />
        <button
          onClick={addProcess}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      {/* Botón para simular */}
      <button
        onClick={simulateFCFS}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Simular FCFS
      </button>

      {/* Tabla de procesos */}
      {processes.length > 0 && (
        <table className="table-auto w-full mb-4 border">
          <thead>
            <tr>
              <th className="border px-2">ID</th>
              <th className="border px-2">Llegada</th>
              <th className="border px-2">Ejecución</th>
              <th className="border px-2">Inicio Bloqueo</th>
              <th className="border px-2">Duración Bloqueo</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p, index) => (
              <tr key={index}>
                <td className="border px-2">{p.id}</td>
                <td className="border px-2">{p.arrival}</td>
                <td className="border px-2">{p.execution}</td>
                <td className="border px-2">{p.blockStart}</td>
                <td className="border px-2">{p.blockDuration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Gráfico */}
      <div className="relative w-full h-64 border">
        {chartData.map((p, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              position: "absolute",
              left: `${p.start * 10}px`,
              top: `${index * 30}px`,
              height: "20px",
            }}
          >
            {/* Ejecución */}
            <div
              className="bg-green-500"
              style={{
                width: `${(p.blockStart - p.start) * 10}px`,
                height: "20px",
              }}
            ></div>
            {/* Bloqueo */}
            <div
              className="bg-red-500"
              style={{
                width: `${(p.blockEnd - p.blockStart) * 10}px`,
                height: "20px",
              }}
            ></div>
            {/* Post bloqueo */}
            <div
              className="bg-gray-500"
              style={{
                width: `${(p.end - p.blockEnd) * 10}px`,
                height: "20px",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FCFS;
