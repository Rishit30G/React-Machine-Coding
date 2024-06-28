import React from 'react'
import {useDispatch, useSelector} from 'react-redux'; 
import { increment, decrement } from '../state/counter/counterSlice';

const Counter = () => {

    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}

export default Counter