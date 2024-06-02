import React from "react";
import { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Please enter a valid phone number");
      return;
    }
    setShowOTP(true);
  };

  const onOTPSubmit = (otp) => {
    console.log("otp");
  }
  return (
    <div>
      {
        !showOTP ? <form onSubmit={handlePostSubmit}>
                        <input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        placeholder="enter phone number"
                        />
                     <button type="submit">Submit</button>
      </form>

         : 
                    <div>
                    <p> Enter OTP Sent to {phoneNumber} </p>
                    <OtpInput length={4} onOTPSubmit={onOTPSubmit}/>
                    </div>
      }
    </div>
  );
};

export default PhoneOTPLogin;
