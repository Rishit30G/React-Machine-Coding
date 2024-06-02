import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';

const OtpInput = ({length=4, onOtpSubmit=()=>{}}) => {
    const [otp, setOtp] = React.useState(new Array(length).fill(""));
    const InputRefs = useRef([]);
    console.log(InputRefs);
    useEffect(() => {
        InputRefs.current[0].focus();
    }, []);
  
    const handleChange = (index, element) => {
        const value = element.target.value;
        if(isNaN(value)) return false;
        const newOTP = [...otp];
        //allow ony one input 
        newOTP[index] = value.substring(value.length-1);
        setOtp(newOTP);

        //on otp submit 
        const combinedOTP = newOTP.join('');
        if(combinedOTP.length === length)
            onOtpSubmit(combinedOTP);

        //Move to next input if current field is filled 
        if(value && index < length - 1 && InputRefs.current[index+1]){
            InputRefs.current[index+1].focus();
        }
    }

    const handleClick = (index) => {
        InputRefs.current[index].setSelectionRange(1, 1);

        if(index > 0 && !otp[index-1]){
            InputRefs.current[otp.indexOf("")].focus();
        }
    }

    const handleKeyDown = (index, e) => {
        if(e.key == "Backspace" && index > 0 && !otp[index]){
            InputRefs.current[index-1].focus();
        }
    }
  
    return (
                <div>
                    {
                        otp.map((value, index) => {
                            return (
                                <input 
                                key={index}
                                type="text"
                                ref={(input) => InputRefs.current[index] = input}
                                value={value}
                                onChange={(e) => handleChange(index, e)}
                                onClick={() => handleClick(index)}
                                onKeyDown={ (e) => handleKeyDown(index, e)}
                                className='otpInput'
                                />
                            )
                        })
                    }
                </div>
  )
}

export default OtpInput;