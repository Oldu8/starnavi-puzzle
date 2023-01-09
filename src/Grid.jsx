import React, { useEffect, useState } from "react";

function Grid() {
  const [hoveredTiles, setHoveredTiles] = useState(new Set());
  const [log, setLog] = useState([]);
  const [options, setOptions] = useState([]);
  const [size, setSize] = useState(5);

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
  for (let i = 0; i < size / 5; i++) {
    const columns = [];
    for (let j = 0; j < 5; j++) {
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

  useEffect(() => {
    fetch("https://demo7919674.mockable.io/")
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
        console.log(data);
      });
  }, []);

  function onChangeSelect(e) {
    console.log(e.target.value);
    setSize(e.target.value);
  }

  return (
    <div className="puzzle">
      <div className="container">
        <select className="select" value={size} onChange={onChangeSelect}>
          {options.map((i) => {
            return (
              <option key={i.name} value={i.field} className="option">
                {`Level: ${i.name}, fields: ${i.field}`}
              </option>
            );
          })}
        </select>
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
