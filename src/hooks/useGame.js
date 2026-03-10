import { useEffect, useState } from "react";
import { chess } from "../chess/chessInstance";
import { createSocket } from "../api/websocket";
import { toast } from "react-toastify";

export default function useGame() {
  const [board, setBoard] = useState(chess.board());
  const [socket, setSocket] = useState(null);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState(chess.turn());


  useEffect(() => {
    const ws = createSocket((data) => {
      chess.load(data.fen);
      setBoard(chess.board());
      setTurn(chess.turn());
    });

    setSocket(ws);
    return () => ws.close()
  }, []);
  function coordToSquare(x, y) {
  const file = String.fromCharCode(97 + x); // a-h
  const rank = 8 - y;                       // board is reversed
  return file + rank;
}
function undoMove() {

    const move = chess.undo();

    if (!move) return; // nothing to undo

    setBoard(chess.board());
    setTurn(chess.turn());

    socket?.send(JSON.stringify({
      type: "undo"
    }));
  }
function resetGame() {
  chess.reset();              // resets chess.js internal state
  setBoard(chess.board());    // update React board
  setSelected(null);
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
      setTurn(chess.turn());
      socket?.send(JSON.stringify({ from, to }));

      // check game status
      if(chess.isCheck()) {
        toast.info("Check!");
      }
      if (chess.isGameOver()) {

        if (chess.isCheckmate()) {
          toast.error("Checkmate!");
        } 
        else if (chess.isStalemate()) {
          toast.warn("Stalemate!");
        } 
        else {
          toast.info("Draw!");
        }
        resetGame();
      }
    }

  } catch (err) {
    toast.error("Invalid move");
  }

  // always clear selection so next click works
  setSelected(null);
}

  return { board, selectSquare, undoMove, turn };
}