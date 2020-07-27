import React, { useState } from 'react';
import './App.css';

function App() {

  const numRows = 50;
  const numCols = 50;

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for(let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }

    return rows;
  });

  console.log(grid)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numCols}, 30px)`
    }}>
    
    {grid.map((rows, i) => 
      rows.map((col, q) => 
      (<div 
        key={`${i}-${q}`}
        onClick={() => {
          
        }}
        style={{
          height: 30, 
          width: 30, 
          backgroundColor: grid[i][q] ? "darkgreen" : undefined,
          border: "1px solid green",
    }} />
    ))
    )}
    
    </div>
  );
}

export default App;
