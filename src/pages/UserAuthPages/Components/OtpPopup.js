import React, { useState, useRef } from 'react';

const OTPPopup = ({ isOpen, onClose, onSubmit }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    // if (!value) return; // Ignore empty values

    const newOtp = [...otp];
    newOtp[index] = value;

    // Move focus to the next input field
    if (index < 3) {
      refs[index + 1].current.focus();
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      e.preventDefault(); 
     
      setOtp(prevOtp => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = '';
        return newOtp;
      });
      refs[index - 1].current.focus();
    }
  };

  const handleResend = () => {
    // Handle resend functionality
    onClose()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    onSubmit(otpCode);
    
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="relative bg-white px-6 pt-10 pb-4 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-5">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
           <span className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">You will receive otp on your registred Email</span>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-3">
              <label htmlFor="otp" className='px-2'>Enter OTP</label>
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {otp.map((digit, index) => (
                    <div key={index} className="w-16 h-16 ">
                      <input
                        ref={refs[index]}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength={1}
                        className="w-full p-4 rounded-md border outline-none border-gray-300  focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                        type="text"
                        name={`otp-${index}`}
                        id={`otp-${index}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button type="submit" className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#02AB6C] border-none text-white text-sm shadow-sm font-bold">
                      Verify 
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p> <a className="flex flex-row items-center text-green-600 cursor-pointer" onClick={handleResend}>Resend</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPopup;
