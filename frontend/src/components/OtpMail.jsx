import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Provider, useSelector } from 'react-redux';
import { AuthService } from '../Axios.js/AuthService';
import { login, setStatus } from '../Store/Context';
import store from '../Store/Store';
function OtpMail() {

const dispatch = useDispatch()


  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));

 
  const handleChange =async (element, index) => {
    if (!isNaN(element.value) && element.value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = element.value;
    

       setOtp(updatedOtp);
   
      
       if (element.nextSibling && element.value !== "") {
         element.nextSibling.focus();
    
    }
  };
  }
  const email = useSelector((state)=>state.persistedReducer.user.email)
  console.log(email)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join(""); 
    console.log("OTP entered:", Number(otpValue));

    
    try {
     
      const isValid = await AuthService.verify({email,otp:otpValue});
      if (isValid) {
        alert("OTP verified successfully!");
        await dispatch(setStatus())
        navigate("/Read-Books"); 
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (err) {
      alert("error in verifying otp")
      console.error("Error in verifying OTP:", err);
    }
  };

 
  const resend=async()=>{
    const res =await AuthService.resend()
    if(res){
      alert("otp send again")
      
    }else{
alert("invalid credentials send")
    }}

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">
          Verify OTP Sent to Your Email
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-10 h-10 text-center border rounded-md focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()} 
              />
            ))}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
        <div className="text-center mt-4">
          Resend OTP?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => resend()}
          >
            Resend OTP
          </span>
        </div>
      </div>
    </div>
   
  );
}

export default OtpMail;

