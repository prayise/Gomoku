"use client";
import React, { useState } from 'react';
import GomokuBoard from './components/GomokuBoard';

const BOARD_SIZE = 15;
type Stone = null | '흑' | '백';

function createEmptyBoard(): Stone[][] {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
}

export default function Home() {
  const [board, setBoard] = useState<Stone[][]>(createEmptyBoard());
  const [turn, setTurn] = useState<'흑' | '백'>('흑');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Stone>(null);

  // 오목 승리 조건 체크 함수
  function checkWinner(board: Stone[][], lastRow: number, lastCol: number): Stone | null {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    const current = board[lastRow][lastCol];
    if (!current) return null;
    for (const [dx, dy] of directions) {
      let count = 1;
      for (let dir = -1; dir <= 1; dir += 2) {
        let x = lastRow + dx * dir;
        let y = lastCol + dy * dir;
        while (
          x >= 0 && x < BOARD_SIZE &&
          y >= 0 && y < BOARD_SIZE &&
          board[x][y] === current
        ) {
          count++;
          x += dx * dir;
          y += dy * dir;
        }
      }
      if (count >= 5) return current;
    }
    return null;
  }

  // 셀 클릭 핸들러 (2인용)
  function handleCellClick(row: number, col: number) {
    if (gameOver || board[row][col]) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = turn;
    setBoard(newBoard);

    const win = checkWinner(newBoard, row, col);
    if (win) {
      setGameOver(true);
      setWinner(win);
      return;
    }

    setTurn(turn === '흑' ? '백' : '흑');
  }

  function handleRestart() {
    setBoard(createEmptyBoard());
    setTurn('흑');
    setGameOver(false);
    setWinner(null);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Gomoku Game (2 Players)</h1>
      <div className="mb-4">
        <span className="font-semibold">현재 턴: </span>
        <span className={`font-bold ${turn === '흑' ? 'text-black' : 'text-gray-600'}`}>
          플레이어 {turn === '흑' ? '1 (흑)' : '2 (백)'}
        </span>
      </div>
      <div className="relative">
        <GomokuBoard board={board} onCellClick={handleCellClick} />
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <div className="bg-white/95 p-8 rounded-xl shadow-2xl border-4 border-yellow-500 text-center transform scale-100 transition-transform duration-300">
              <h2 className="text-6xl font-extrabold text-gray-800">
                {winner} 승!
              </h2>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleRestart}>다시 시작</button>
      </div>
    </main>
  );
} 