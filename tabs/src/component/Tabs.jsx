import React, { useState } from 'react'

const Tabs = ({tabs}) => {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='custom-tabs'>
        <div className='tabs'>
            {tabs.map((tab, index) => (
                <div 
                    key={index}
                    className={`tab ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                >
                {tab.label}
                </div>
            ))}
        </div>
        <div className='tab-content'>
            {tabs[activeIndex].content}
        </div>
    </div>
  )
}

export default Tabs