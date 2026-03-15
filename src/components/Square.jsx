import { pieceIcons } from "../utils/pieceIcons";
import "../styles/square.css";

function Square({ x, y, piece, validMoves, onClick }) {
  const isDark = (x + y) % 2 === 1;

  const pieceKey = piece
    ? piece.color === "w"
      ? piece.type.toUpperCase()
      : piece.type
    : null;

  // convert coordinates → chess square
  const file = String.fromCharCode(97 + x); // a-h
  const rank = 8 - y;
  const square = file + rank;

  const isValidMove = validMoves?.includes(square);

  return (
    <div
      className={`square 
        ${isDark ? "dark" : "light"} 
        ${isValidMove ? "valid-move" : ""}
      `}
      onClick={() => onClick(x, y)}
    >
      {pieceKey ? pieceIcons[pieceKey] : ""}
    </div>
  );
}

export default Square;