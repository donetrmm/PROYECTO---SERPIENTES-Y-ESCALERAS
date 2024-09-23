import React from "react";
import Cell from "./Cell";

const Board = ({ playerPositions }) => {
  const boardSize = 10;
  const cells = [];

  for (let i = 0; i < boardSize * boardSize; i++) {
    cells.push(<Cell key={i} index={i} playerPositions={playerPositions} />);
  }

  return (
    <>
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        }}
      >
        {cells}
      </div>
    </>
  );
};

export default Board;
