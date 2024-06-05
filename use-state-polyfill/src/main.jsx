import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'


let callIndex = -1; 
const stateValues = []; 
const App = () => {


const useState = (initialValue) => {

  callIndex++;

  const currentCallIndex = Number(callIndex);

  if(stateValues[currentCallIndex] === undefined) {
    stateValues[currentCallIndex] = initialValue;
  }
  const setValue = (newValue) => {
    stateValues[currentCallIndex] = newValue
    render();
    console.log("new Value: ", newValue);
  }

  return [stateValues[currentCallIndex], setValue]
}

const [countA, setCountA] = useState(1);
const [countB, setCountB] = useState(-1);

  return (
    <div>
      <div>
        <h1>Count A: {countA}</h1>
        <button onClick={() => setCountA(countA + 1)}>Increment A</button>
        <button onClick={() => setCountA(countA - 1)}>Decrement A</button>
      </div>
      <div>
        <h1>Count B: {countB}</h1>
        <button onClick={() => setCountB(countB + 1)}>Increment B</button>
        <button onClick={() => setCountB(countB - 1)}>Decrement B</button>
      </div>
    </div>
  )
}

const render = () => {
  callIndex = -1;
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
render();