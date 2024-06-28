import { useState, useEffect } from "react";

const ProgressBar = ({ value }) => {

   const percent = value;
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