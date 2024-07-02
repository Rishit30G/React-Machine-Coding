import { useEffect, useState } from 'react'
import {data} from './constants'
import './App.css'

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    !activeIndex ? setActiveIndex(data.length - 1) : setActiveIndex(activeIndex - 1);
  }

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % data.length); 
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleNext();
    }, 5000);
    return () => {
      clearTimeout(timeout);
    }
  }, [activeIndex])

  return (
    <>
    <div className="app">
       <button onClick={handlePrevious}>Previous</button>
       {
          data.map((item, index) => {
            return (
              <div key={item.id} className={index === activeIndex ? 'slide-active' : 'slide'}>
                <img src={item.src} alt={item.id} className='image' />
              </div>
            )
          })
       }
       <button onClick={handleNext}>Next</button>
    </div>
    </>
  )
}

export default App
