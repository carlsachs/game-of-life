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

    setTimeout(simulation, 100);
  }, [])

  return (
  <div className="wrap">
      <h1 style={{
        color: "white",
        display: "flex",
        justifyContent: "center",
        paddingTop: "3%"
      }}>Carl's Conway's Game of Life</h1>
      <div style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginBottom: "3%"
      }}>
        <button style={{
          width: "200px",
          height: "35px",
          backgroundColor: "#1c5c24",
          border: "1px solid white",
          color: "white"
        }}
        onClick={() => {
          setRunning(!running);
          runRef.current = true;
          simulation();
        }}>
        {running ? "Kill" : "Birth"}
        </button>
        <button style={{
          width: "200px",
          height: "35px",
          backgroundColor: "#1c5c24",
          border: "1px solid white",
          color: "white"
        }}
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }
          setGrid(rows);
        }}
      >
      Random Generation Cycle
      </button>
      </div>
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
            height: 25, 
            width: 25, 
            backgroundColor: grid[i][q] ? "#54ff68" : undefined,
            border: "1px solid #1c5c24",
          }} />
          ))
          )}
      
      </div>
    </div>
  );
}

export default App;
