import { getSquares } from "./lib/squares";
import { Card } from "./ui/Card";

import "./App.scss";

function App() {
  const squares = getSquares(25);

  return (
    <div className="App">
      <div className="tb-upper"></div>
      <Card squares={squares} />
      <div className="tb-lower"></div>
    </div>
  );
}

export default App;
