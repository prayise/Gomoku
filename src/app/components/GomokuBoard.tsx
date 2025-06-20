import React from 'react';

type Stone = null | '흑' | '백';

interface GomokuBoardProps {
  board: Stone[][];
  onCellClick: (row: number, col: number) => void;
}

export default function GomokuBoard({ board, onCellClick }: GomokuBoardProps) {
  return (
    <div className="inline-block border-4 border-yellow-700 bg-yellow-100 rounded-lg shadow-lg">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="flex">
          {row.map((cell, colIdx) => (
            <button
              key={colIdx}
              className="w-8 h-8 flex items-center justify-center border border-yellow-400 hover:bg-yellow-200 focus:outline-none"
              onClick={() => onCellClick(rowIdx, colIdx)}
              disabled={cell !== null}
            >
              {cell === '흑' && <div className="w-5 h-5 rounded-full bg-black" />}
              {cell === '백' && <div className="w-5 h-5 rounded-full bg-white border border-gray-400" />}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
} 