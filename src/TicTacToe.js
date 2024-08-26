// src/TicTacToe.js
import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerX, setPlayerX] = useState('Player X');
  const [playerO, setPlayerO] = useState('Player O');
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(newBoard) || newBoard[index]) return;
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleResetScore = () => {
    setScore({ X: 0, O: 0 });
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    if (name === 'playerX') setPlayerX(value);
    if (name === 'playerO') setPlayerO(value);
  };

  const winner = calculateWinner(board);

  useEffect(() => {
    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
    }
  }, [winner]);

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  let status;
  if (winner) {
    status = (
      <div className="status winner">
        Winner: {winner === 'X' ? playerX : playerO}
      </div>
    );
  } else {
    status = <div className="status">Next player: {isXNext ? playerX : playerO}</div>;
  }

  return (
    <div>
      <div className="name-inputs">
        <input
          type="text"
          name="playerX"
          value={playerX}
          onChange={handleNameChange}
          placeholder="Enter name for Player X"
        />
        <input
          type="text"
          name="playerO"
          value={playerO}
          onChange={handleNameChange}
          placeholder="Enter name for Player O"
        />
      </div>
      <div className="score">
        <div className="player-score">
          <div>{playerX}</div>
          <span>{score.X}</span>
        </div>
        <div className="player-score">
          <div>{playerO}</div>
          <span>{score.O}</span>
        </div>
      </div>
      {status}
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="controls">
        <button className="btn" onClick={handleNewGame}>New Game</button>
        <button className="btn" onClick={handleResetScore}>Reset Score</button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;
