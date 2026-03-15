import Square from "./Square";
import useGame from "../hooks/useGame";
import "../styles/board.css";

function ChessBoard() {
  const { board, selectSquare, turn, undoMove, validMoves } = useGame();

  return (
    <div className="chess-board">
       <h2>
        Turn: {turn === "w" ? "White" : "Black"}
      </h2>
      <button onClick={undoMove}>
        Undo Move
      </button>
      <div className="board">
      {board.map((row, y) =>
        row.map((square, x) => (
          <Square
            key={`${x}-${y}`}
            x={x}
            y={y}
            piece={square}
            validMoves={validMoves}
            onClick={selectSquare}
          />
        ))
      )}
    </div>
    </div>
    
  );
}

export default ChessBoard;