import React, { useState, useRef, useEffect } from "react";

const OtpInput = (props) => {
  const { length = 4, onOtpSubmit = () => {} } = props;

  const inputRef = useRef([]);

  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleOtpFieldChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    } else {
      if (value && index < length - 1 && inputRef.current[index + 1]) {
        if (newOtp[index + 1]) {
          // while we don't find empty index
          let start = index + 2;
          while (newOtp[start]) {
            start = start + 1;
          }
          if (start !== length) inputRef.current[start].focus();
        } else {
          inputRef.current[index + 1].focus();
        }
      }
    }
  };

  const handleClick = (index) => {
    inputRef.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRef.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRef?.current?.[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  return (
    <div>
      <h2>OTP Input</h2>
      {otp.map((value, index) => {
        return (
          <input
            ref={(input) => (inputRef.current[index] = input)}
            type="text"
            key={index}
            value={value}
            onChange={(e) => handleOtpFieldChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otp-input"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
