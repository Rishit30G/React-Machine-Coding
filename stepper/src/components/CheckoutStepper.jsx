import { useState } from "react";

const CheckoutStepper = ({ stepsConfig = [] }) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);
    const ActiveComponent = stepsConfig[currentStep - 1]?.Component;
  if (!stepsConfig.length) {
    return <></>;
  }


    const handleNext = () => {
        setCurrentStep(prevStep => {
            if(prevStep === stepsConfig.length){
                setIsCompleted(true)
                return prevStep
            }
            else{
                return prevStep + 1
            }
        })
    }


    const calculateProgressBarWidth = () => {
        if(isCompleted){
            return 100
        }
        return (currentStep - 1) * 100 / stepsConfig.length
    }
  return (
    <>
    <div className="stepper">
      {stepsConfig.map((step, index) => {
        return (
          <div key={step.name} className={`step ${currentStep > index + 1 || isCompleted ? "complete" : ""} ${currentStep === index + 1 ? "active" : ""}`}>
            <div className="step-number">
                
                {
                currentStep > index + 1 || isCompleted ? (<span>
                    &#10003;
                </span>)
                : (index + 1)
      }
      </div>
            <div className="step-name">{step.name}</div>
          </div>
        );
      })}
    </div>

    <div className="progress-bar">
        <div className="progress" style={{width: `${calculateProgressBarWidth()}%`}}>

        </div>
    </div>

    <ActiveComponent />

    <button className="btn" onClick={handleNext}> { currentStep === stepsConfig.length ? "Finish" : "Next"}</button>
    </>
  );
};

export default CheckoutStepper;
