import React, { useEffect, useState } from 'react'
import config from '../config'

const TrafficLight = () => {

 const [currentLight, setCurrentLight] = useState(config.green);

  useEffect(() => {
    const timer = setTimeout(() => {
        setCurrentLight(config[currentLight.next])   
    }, currentLight.duration);

    return () => {
        clearTimeout(timer);
    }
  }, [currentLight]);

  return (
    <>
      <div className='traffic-light-container'> 
        <div className='traffic-light'>
            {
                Object.keys(config).map((lightKey) => {
                    const isActive = currentLight === config[lightKey];
                    return (
                        <div className='circle' key={lightKey} style={{
                            backgroundColor: isActive ? config[lightKey].backgroundColor : '#444'
                        }}></div>
                    )
                })
            }
        </div>
        <div className="stick"></div>
        <div className="zeebra-container">
        <div className="zeebra-gray"></div> 
            <div className="zeebra-yellow"></div>
            <div className="zeebra-gray"></div>
            <div className="zeebra-yellow"></div>
            <div className="zeebra-gray"></div>
        </div>
    </div>
    </>
  )
}

export default TrafficLight