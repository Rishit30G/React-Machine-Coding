import { useState } from 'react'
import './App.css'
import { data } from './constants'


function App() {

  const [active, setActive] = useState([])
  const toggle = (index) => {
    if(active.includes(index)){
      setActive(active.filter(item => item !== index))
    }
    else{
      setActive([...active, index])
    }
  }

  console.log(active)
  return (
    <div className='wrapper'>
      <div className='accordian'>
         {data.map((item, index) => {
          return (
            <div className='item' key={index}>
               <div className='title' onClick={() => toggle(index)}>
                  <h2>{item.question}</h2>
                  <span className='icon'>{active.includes(index) ?'+' : '-'}</span>
               </div>
               <div className='content'>{active.includes(index) && item.answer}</div>
            </div>
          )
         })}
      </div>
    </div>
  )
}

export default App
