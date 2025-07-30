import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Modern & minimalistic Tic Tac Toe game for two players,
 * with responsive layout, player indicators, winner/draw message,
 * and start/restart button. Colors: primary (#1976d2), secondary (#424242), accent (#ffd600).
 * Board always centered, controls/status/messages above/below board.
 * Light theme, adapts for desktop/mobile.
 */

// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  // Starts or restarts the game
  // PUBLIC_INTERFACE
  const startGame = () => {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setWinner(null);
    setDraw(false);
    setGameActive(true);
  };

  // Returns winner's symbol or null if ongoing, or "draw" if draw
  // PUBLIC_INTERFACE
  function checkWinner(_board) {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6], // diagonals
    ];
    for (const [a, b, c] of wins) {
      if (
        _board[a] &&
        _board[a] === _board[b] &&
        _board[a] === _board[c]
      ) {
        return _board[a];
      }
    }
    if (_board.every((square) => square)) return "draw";
    return null;
  }

  useEffect(() => {
    if (!gameActive) return;
    const result = checkWinner(board);
    if (result === "X" || result === "O") {
      setWinner(result);
      setGameActive(false);
    } else if (result === "draw") {
      setDraw(true);
      setGameActive(false);
    }
  }, [board, gameActive]);

  // PUBLIC_INTERFACE
  const handleClick = (idx) => {
    if (!gameActive || board[idx] || winner || draw) return;
    const newBoard = [...board];
    newBoard[idx] = isX ? "X" : "O";
    setBoard(newBoard);
    setIsX(!isX);
  };

  // PUBLIC_INTERFACE
  const renderSquare = (idx) => (
    <button
      className="ttt-square"
      aria-label={`Square ${idx + 1}, ${
        board[idx] ? (board[idx] === "X" ? "X" : "O") : "empty"
      }`}
      onClick={() => handleClick(idx)}
      disabled={!!board[idx] || winner || draw || !gameActive}
      tabIndex={gameActive ? 0 : -1}
      key={idx}
    >
      {board[idx]}
    </button>
  );

  // Turn display
  const nextPlayer = isX ? "X" : "O";

  // Accent color for active player
  const xActive = gameActive && !winner && !draw && isX;
  const oActive = gameActive && !winner && !draw && !isX;

  // Status message display
  let statusMsg = "";
  if (!gameActive && !winner && !draw && board.every((s) => !s)) {
    statusMsg = "Press Start to play!";
  } else if (winner) {
    statusMsg = `Winner: ${winner}`;
  } else if (draw) {
    statusMsg = "It's a draw!";
  } else if (gameActive) {
    statusMsg = `Turn: ${nextPlayer}`;
  }

  return (
    <div className="ttt-app-root">
      <main className="ttt-main">
        <h1 className="ttt-title">
          <span style={{ color: "var(--accent)" }}>Tic</span>{" "}
          <span style={{ color: "var(--primary)" }}>Tac</span>{" "}
          <span style={{ color: "var(--secondary)" }}>Toe</span>
        </h1>

        {/* Player turn indicator */}
        <div className="ttt-player-row">
          <div
            className={"ttt-player ttt-player-x" + (xActive ? " ttt-active" : "")}
            aria-label={xActive ? "X's turn" : "Player X"}
          >
            X
          </div>
          <div className="ttt-vs">vs</div>
          <div
            className={"ttt-player ttt-player-o" + (oActive ? " ttt-active" : "")}
            aria-label={oActive ? "O's turn" : "Player O"}
          >
            O
          </div>
        </div>

        {/* Status Message */}
        <div className="ttt-status">{statusMsg}</div>

        {/* Board */}
        <div className="ttt-board-wrapper">
          <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
            {[0, 1, 2].map((row) => (
              <div className="ttt-board-row" key={row} role="row">
                {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button className="ttt-btn ttt-btn-large" onClick={startGame}>
          {gameActive ? "Restart" : board.some((s) => s) ? "Restart" : "Start"}
        </button>

        {/* Attribution */}
        <div className="ttt-footer">
          <span style={{ color: "var(--secondary)" }}>
            Modern Minimalistic React Tic-Tac-Toe
          </span>
        </div>
      </main>
    </div>
  );
}

export default App;
