import { useState } from 'react'
import './App.css'
import Notes from './component/Notes';

function App() {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState([
    {
      id: 1, 
      text: "Check the description for more information", 
    }, 
    {
      id: 2, 
      text: "Share the link with your friends", 
    },
  ]); 

  const handleClick = () => {
    setNotes([
      ...notes, 
      {
        id: Math.random(), 
        text: text
      },
    ]); 
    setText('');
  };

  return (
    <div>
      <div className='text-container'>
        <div className="textfield">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleClick}>Submit</button>
        </div>
      </div>
      <Notes notes={notes} setNotes={setNotes}/>
    </div>
  )
}

export default App 
