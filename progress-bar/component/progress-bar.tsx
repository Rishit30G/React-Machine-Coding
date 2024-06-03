import { useState, useEffect } from "react";

const ProgressBar = ({ value, onComplete = ()=>{} }: { value: number, 
    onComplete: () => void
}) => {

    const [percent, setPercent] = useState(value); 

    useEffect(() => {
        setPercent(Math.min(100, Math.max(value, 0)));
        if( percent === 100) {
            onComplete();
        }
    }, [value]);
  return (
    <div className="progress">
      <span className={percent <= 50 ? "" : "progess progress-white"}>{percent.toFixed()}%
      </span>
      <div 
       role="progressbar"
       aria-valuemin={0}
       aria-valuemax={100}
       aria-valuenow={percent.toFixed()}
      style={{width: `${percent}%`}}></div>
    </div>
  );
};

export default ProgressBar; 