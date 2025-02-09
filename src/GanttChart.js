import React from 'react';

function GanttChart({ ganttData }) {
  return (
    <div className="gantt-chart">
      {ganttData.map((data, index) => (
        <div key={index} className="gantt-bar">
          <div className="process-name">{data.process}</div>
          <div className="bar" style={{ width: `${data.executionTime * 20}px` }}>
            <div className="execution" style={{ width: '100%', backgroundColor: 'green' }}></div>
            <div className="block" style={{ width: `${data.blockDuration * 20}px`, backgroundColor: 'red' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GanttChart;