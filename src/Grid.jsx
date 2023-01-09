import React, { useState } from "react";

function Grid({ size }) {
  const [hoveredTiles, setHoveredTiles] = useState(new Set());
  const [log, setLog] = useState([]);

  function handleMouseEnter(event) {
    const id = event.target.id;
    setHoveredTiles(new Set(hoveredTiles).add(id));
    setLog([...log, id]);
  }

  function handleClear() {
    setHoveredTiles(new Set());
    setLog([]);
  }

  const grid = [];
  for (let i = 0; i < size; i++) {
    const columns = [];
    for (let j = 0; j < size; j++) {
      const id = `${i}-${j}`;
      columns.push(
        <div
          key={id}
          id={id}
          onMouseEnter={handleMouseEnter}
          className="tile"
          style={{
            backgroundColor: hoveredTiles.has(id) ? "blue" : "white",
          }}
        />
      );
    }
    grid.push(
      <div key={i} className="grid">
        {columns}
      </div>
    );
  }

  return (
    <div className="puzzle">
      <div className="container">
        <div className="puzzleBox">{grid}</div>
        <button className="btn" onClick={handleClear}>
          Clear
        </button>
      </div>
      <div className="logBox">
        <h3 className="subtitle">Hover squares</h3>
        <div className="logs">
          {log.map((id) => (
            <div className="logItem" key={id}>
              row {id.split("-")[0] + 1}, column {id.split("-")[1] + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Grid;
