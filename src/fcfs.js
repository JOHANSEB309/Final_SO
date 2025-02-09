import React, { useState } from "react";
import "./FCFS.css";

const FCFS = () => {
    const [processes, setProcesses] = useState([]);
    const [form, setForm] = useState({
        name: "",
        arrival: "",
        execution: "",
        blockStart: "",
        blockDuration: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProcess = {
            name: form.name,
            arrival: parseInt(form.arrival),
            execution: parseInt(form.execution),
            blockStart: parseInt(form.blockStart),
            blockDuration: parseInt(form.blockDuration),
        };
        setProcesses((prev) => [...prev, newProcess].sort((a, b) => a.arrival - b.arrival));
        setForm({ name: "", arrival: "", execution: "", blockStart: "", blockDuration: "" });
    };

    const calculateMetrics = () => {
        let currentTime = 0;
        return processes.map((process) => {
            const startTime = Math.max(currentTime, process.arrival);
            const blockEnd = process.blockStart + process.blockDuration;
            const endTime = startTime + process.execution;
            const turnaroundTime = endTime - process.arrival;
            const lostTime = turnaroundTime - process.execution;
            const penalty = (turnaroundTime / process.execution).toFixed(2);
            const responseTime = startTime - process.arrival;
            currentTime = endTime;

            return { ...process, startTime, endTime, turnaroundTime, lostTime, penalty, responseTime };
        });
    };

    const renderChart = (process) => {
        const { arrival, startTime, blockStart, blockDuration, endTime } = process;
        const bar = [];

        for (let i = arrival; i < endTime; i++) {
            const className =
                i < startTime
                    ? "waiting"
                    : i >= blockStart && i < blockStart + blockDuration
                    ? "blocked"
                    : "execution";
            bar.push(<div key={i} className={`bar-segment ${className}`} style={{ width: "20px" }}></div>);
        }
        return bar;
    };

    const metrics = calculateMetrics();

    return (
        <div>
            <h1>Simulación del Algoritmo FCFS</h1>
            <form onSubmit={handleSubmit}>
                <h2>Ingrese los datos del proceso</h2>
                <label>Nombre del Proceso:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                />
                <label>Instante de Llegada:</label>
                <input
                    type="number"
                    name="arrival"
                    value={form.arrival}
                    onChange={handleInputChange}
                    required
                />
                <label>Tiempo de Ejecución:</label>
                <input
                    type="number"
                    name="execution"
                    value={form.execution}
                    onChange={handleInputChange}
                    required
                />
                <label>Inicio de Bloqueo:</label>
                <input
                    type="number"
                    name="blockStart"
                    value={form.blockStart}
                    onChange={handleInputChange}
                    required
                />
                <label>Duración del Bloqueo:</label>
                <input
                    type="number"
                    name="blockDuration"
                    value={form.blockDuration}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Agregar Proceso</button>
            </form>
            <h2>Tabla de Procesos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Proceso</th>
                        <th>Instante de Llegada</th>
                        <th>Ejecución</th>
                        <th>Bloqueo (Inicio)</th>
                        <th>Bloqueo (Duración)</th>
                        <th>Instante Fin</th>
                        <th>Retorno</th>
                        <th>Tiempo Perdido</th>
                        <th>Penalidad</th>
                        <th>Tiempo de Respuesta</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.map((process, index) => (
                        <tr key={index}>
                            <td>{process.name}</td>
                            <td>{process.arrival}</td>
                            <td>{process.execution}</td>
                            <td>{process.blockStart}</td>
                            <td>{process.blockDuration}</td>
                            <td>{process.endTime}</td>
                            <td>{process.turnaroundTime}</td>
                            <td>{process.lostTime}</td>
                            <td>{process.penalty}</td>
                            <td>{process.responseTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Gráfica de Barras</h2>
            <div>
                {metrics.map((process, index) => (
                    <div key={index} className="chart">
                        <strong>{process.name}</strong>
                        <div className="bar">{renderChart(process)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FCFS;
