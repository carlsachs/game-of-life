import React, { useState, useCallback, useRef } from 'react';
import './App.css';

//import other libraries
import produce from "immer";

function App() {

  const numRows = 50;
  const numCols = 50;

  const probabilities = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ]

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for(let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }

    return rows;
  });

  const [running, setRunning] = useState(false);
  
  const runRef = useRef(running);
  runRef.current = running

  const simulation = useCallback(() => {
    if (!runRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let q = 0; q < numCols; q++){
            let neighbors = 0;
            probabilities.forEach(([x, y]) => {
              const newI = i + x;
              const newQ = q + y;
              if (newI >= 0 && newI < numRows && newQ >= 0 && newQ < numCols) {
                neighbors += g[newI][newQ]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][q] = 0;
            } else if (g[i][q] === 0 && neighbors === 3) {
              gridCopy[i][q] = 1;
            }
          }
        }
      })
    })

    setTimeout(simulation, 500);
  }, [])

  return (
  <div>

      <button
      onClick={() => {
        setRunning(!running);
        runRef.current = true;
        simulation();
      }}>
      {running ? "death" : "birth"}
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 30px)`
      }}>
      
      {grid.map((rows, i) => 
        rows.map((col, q) => 
        (<div 
          key={`${i}-${q}`}
          onClick={() => {
            const newGrid = produce(grid, gridCopy => {
              gridCopy[i][q] = grid[i][q] ? 0 : 1;
            })
            setGrid(newGrid)
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
    </div>
  );
}

export default App;
