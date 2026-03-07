import Square from "./Square";
import useGame from "../hooks/useGame";
import "../styles/board.css";

function ChessBoard() {
  const { board, selectSquare } = useGame();

  return (
    <div className="board">
      {board.map((row, y) =>
        row.map((square, x) => (
          <Square
            key={`${x}-${y}`}
            x={x}
            y={y}
            piece={square}
            onClick={selectSquare}
          />
        ))
      )}
    </div>
  );
}

export default ChessBoard;