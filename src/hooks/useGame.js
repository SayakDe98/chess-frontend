import { useEffect, useState } from "react";
import { chess } from "../chess/chessInstance";
import { createSocket } from "../api/websocket";

export default function useGame() {
  const [board, setBoard] = useState(chess.board());
  const [socket, setSocket] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const ws = createSocket((data) => {
      chess.load(data.fen);
      setBoard(chess.board());
    });

    setSocket(ws);
    return () => ws.close()
  }, []);
  function coordToSquare(x, y) {
  const file = String.fromCharCode(97 + x); // a-h
  const rank = 8 - y;                       // board is reversed
  return file + rank;
}
function selectSquare(x, y) {
  if (!selected) {
    setSelected({ x, y });
    return;
  }

  const from = coordToSquare(selected.x, selected.y);
  const to = coordToSquare(x, y);

  try {
    const move = chess.move({
      from,
      to,
      promotion: "q"
    });

    // only update if move is valid
    if (move) {
      setBoard(chess.board());
      socket?.send(JSON.stringify({ from, to }));
    }

  } catch (err) {
    alert("Invalid move");
  }

  // always clear selection so next click works
  setSelected(null);
}

  return { board, selectSquare };
}