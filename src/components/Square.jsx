import { pieceIcons } from "../utils/pieceIcons";

function Square({ x, y, piece, onClick }) {
  const isDark = (x + y) % 2 === 1;

  const pieceKey = piece
    ? piece.color === "w"
      ? piece.type.toUpperCase()
      : piece.type
    : null;

  return (
    <div
      className={`square ${isDark ? "dark" : "light"}`}
      onClick={() => onClick(x, y)}
    >
      {pieceKey ? pieceIcons[pieceKey] : ""}
    </div>
  );
}

export default Square;