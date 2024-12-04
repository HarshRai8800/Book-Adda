import { useState } from "react";
import { AuthService } from "../Axios.js/AuthService";
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { login } from "../Store/Context";
import { useForm } from "react-hook-form";
function SignUp() {
  
  const dispatch = useDispatch()
  const [error,handleror] = useState("")
  const navigate = useNavigate()
  const {register ,handleSubmit} = useForm()


 
  const Submit =async (data) => {
 
    console.log(data)
    try {
      const res = await AuthService.signup(data)
      console.log(res)
      if(res.user){
       dispatch(login({username:res.user.username,email:res.user.email,password:res.user.password,
        phonenumber:res.user.phonenumber,otp:res.user.OtpMail
      }))
        navigate("/verifyEmail")
      }else{
        handleror(res.data.msg)
      }
      console.log("Form Submitted:", data);
    } catch (error) {
      console.log(error)
    
      alert("signup failed enter valid inputs")
    }
 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
    <form
      onSubmit={handleSubmit(Submit)}
      className="bg-white flex flex-col gap-2 p-6 w-full max-w-md rounded-2xl shadow-lg"
    >
      <input type="text" readOnly={true} value={error} />
  
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Sign Up
      </h2>
  
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-gray-600 font-medium">
          Username
        </label>
        <div className="border border-gray-300 rounded-lg flex items-center focus-within:border-blue-500">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            {...register("username", {
              required: true,
              max: 16
            })}
            className="p-3 w-full outline-none rounded-lg"
          />
        </div>
      </div>
  
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-gray-600 font-medium">
          Email
        </label>
        <div className="border border-gray-300 rounded-lg flex items-center focus-within:border-blue-500">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            })}
            className="p-3 w-full outline-none rounded-lg"
          />
        </div>
      </div>
  
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-gray-600 font-medium">
          Password
        </label>
        <div className="border border-gray-300 rounded-lg flex items-center focus-within:border-blue-500">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            })}
            className="p-3 w-full outline-none rounded-lg"
          />
        </div>
      </div>
  
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber" className="text-gray-600 font-medium">
          Phone Number
        </label>
        <div className="border border-gray-300 rounded-lg flex items-center focus-within:border-blue-500">
          <input
            type="number"
            name="phoneNumber"
            id="phonenumber"
            placeholder="Enter your phone number"
            {...register("phonenumber", {
              required: true,
              pattern: /^[5-9][0-9]{9}$/
            })}
            className="p-3 w-full outline-none rounded-lg"
          />
        </div>
      </div>
  
      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="text-gray-600 font-medium">
          Address
        </label>
        <div className="border border-gray-300 rounded-lg flex items-center focus-within:border-blue-500">
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Enter your address"
            {...register("adress", {
              required: true
            })}
            className="p-3 w-full outline-none rounded-lg"
          />
        </div>
      </div>
  
      <button
        type="submit"
        className="bg-blue-600 text-white font-medium p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
  
      <p className="text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} className="text-blue-600 font-medium cursor-pointer hover:underline">
          Login
        </span>
      </p>
    </form>
  </div>
  
  );
}

export default SignUp;
