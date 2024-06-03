import { useState, useEffect } from 'react';
import ProgressBar from '../component/progress-bar'
import './App.css'

function App() {

  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInterval(()=>{
      setValue((val) => val+1);
    }, 100);
  }, []);

  const handleComplete = () => {
    setSuccess(true);
  }
  
  return (
    <div className="App">
      <span >Progress Bar</span>
      <ProgressBar value={value}  onComplete={handleComplete}/>
      <span>{success ? "Complete" : "Loading..."}</span>
    </div>
  )
}

export default App
