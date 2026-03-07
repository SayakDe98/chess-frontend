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
  }, []);

  function selectSquare(x, y) {
    if (!selected) {
      setSelected({ x, y });
      return;
    }

    const move = {
      fromX: selected.x,
      fromY: selected.y,
      toX: x,
      toY: y
    };

    socket.send(JSON.stringify(move));
    setSelected(null);
  }

  return { board, selectSquare };
}