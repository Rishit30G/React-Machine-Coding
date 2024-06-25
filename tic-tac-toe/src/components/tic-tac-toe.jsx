import React, { useState } from 'react'
import useTicTacToe from '../hooks/use-tic-tac-toe'

const TicTacToe = () => {

    const {handleClick, board, resetGame, getStatusMessage} = useTicTacToe()
    return (
        <div className='game'>
          <div className="status">
            {getStatusMessage()}
            <button className='reset-button' onClick={resetGame}> Reset Game </button>
          </div>
          <div className='board'>
            {board.map((item, index) => {
              return <button className='cell' key={index} onClick={() => handleClick(index)} disabled={item!==null}>
          {item}
              </button>
            })}
          </div>
        </div>
      )
}

export default TicTacToe