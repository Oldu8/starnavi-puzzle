import { useState } from "react";
import "./App.css";
import Grid from "./Grid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h2 className="title">Puzzle</h2>
      <Grid size={5} />
    </div>
  );
}

export default App;
