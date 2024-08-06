import { useState } from 'react';
import './App.css'
import Calendar from './calendar/Calendar';
import { format } from 'date-fns';

function App() {

  const [currentDate, setCurrentDate] = useState(new Date());
  
  const handleSetToday = () => setCurrentDate(new Date());
  
  return (
    <h1 className="mt-16 flex flex-col items-center">
      <div className='mb-6 flex items-center flex-col gap-4'>
        <p>Selected Date: {format(currentDate, 'dd LLLL yyyy')}</p>
        <button onClick={handleSetToday} className='bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-1 rounded text-white'>Today</button>
      </div>
        <Calendar value={currentDate} onChange={setCurrentDate}/>
    </h1>
  )
}

export default App
