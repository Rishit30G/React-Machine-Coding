import { useState, useEffect } from 'react';
import ProgressBar from '../component/progress-bar'
import './App.css'

function App() {

  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value < 100) {
        setValue(value + 1);
      } else {
        clearTimeout(timeoutId);
        setSuccess(true);
      }
    }, 100);

    return () => clearTimeout(timeoutId); 
    
  }, [value]);
  
  return (
    <div className="App">
      <span >Progress Bar</span>
      <ProgressBar value={value} />
      <span>{success ? "Complete" : "Loading..."}</span>
    </div>
  )
}

export default App
