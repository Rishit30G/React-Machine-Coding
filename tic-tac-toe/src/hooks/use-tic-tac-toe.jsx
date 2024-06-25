import { useState } from "react";

const initialBoard = () => Array(9).fill(null);

const useTicTacToe = () => {
    const [board, setBoard] = useState(initialBoard);
    const [isXNext, setIsNext] = useState(true);

    const WINNING_PATTERNS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ]
    const calculateWinner = (currentBoard) => {
        for (let i = 0; i < WINNING_PATTERNS.length; i++) {
            const [a, b, c] = WINNING_PATTERNS[i];
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a];
            }
        }
        return null;
    };
    const handleClick = (index) => {
        const winner = calculateWinner(board);
        if(winner || board[index]) return 
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsNext(!isXNext);
    };
    const getStatusMessage = () => {
        const winner = calculateWinner(board);
        if(winner) return `Winner: ${winner}`;
        if(!board.includes(null)) return 'Draw';
        return `Next player: ${isXNext ? 'X' : 'O'}`;
    };
    const resetGame = () => {
        setBoard(initialBoard());
        setIsNext(true);
    };
    return {board, handleClick, calculateWinner, getStatusMessage, resetGame}
}

export default useTicTacToe;