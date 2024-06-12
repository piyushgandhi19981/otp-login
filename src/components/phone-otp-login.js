import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [PN, setPN] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // phone validations
    const regex = /[^0-9]/g;
    if (PN.length < 10 || regex.test(PN)) {
      alert("Invalid Phone");
    } else {
      // call BE api to
      setShowOtp(true);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPN(value);
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Successfull", otp);
  };

  return (
    <div className="phone-container">
      {!showOtp ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={PN}
            onChange={handlePhoneChange}
            placeholder="Enter Phone..."
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="otp-container">
          <p>Enter OTP sent to {PN}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
