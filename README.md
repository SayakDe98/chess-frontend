# Chess Frontend (React)

A React frontend for the multiplayer chess server.

Uses:

* React
* chess.js
* WebSockets

The UI renders the board and sends moves to the backend server.

---

# Features

* Real-time board updates
* WebSocket communication
* chess.js move handling
* Unicode chess pieces
* Click-to-move interface

---

# Project Structure

```
chess-frontend/

├── package.json
├── index.html
│
└── src/
    ├── main.jsx
    ├── App.jsx
    │
    ├── chess/
    │   chessInstance.js
    │
    ├── api/
    │   websocket.js
    │
    ├── components/
    │   ChessBoard.jsx
    │   Square.jsx
    │
    ├── hooks/
    │   useGame.js
    │
    ├── utils/
    │   pieceIcons.js
    │
    └── styles/
        board.css
```

---

# Requirements

* Node.js 18+
* npm

---

# Install dependencies

```
npm install
```

---

# Run development server

```
npm run dev
```

Open:

```
http://localhost:5173
```

---

# WebSocket Connection

The frontend connects to:

```
ws://localhost:8080/ws
```

Ensure the Go backend is running.

---

# chess.js

This project uses **chess.js** for:

* board representation
* FEN parsing
* legal move validation
* check and checkmate detection

---

# Example Move Flow

1. User clicks a piece
2. User selects destination square
3. Move is sent to server
4. Server validates move
5. Server sends updated FEN
6. Frontend updates board

---

# Future Improvements

* drag-and-drop pieces
* legal move highlighting
* promotion UI
* move history
* timers
* responsive mobile UI

---

# License

MIT
