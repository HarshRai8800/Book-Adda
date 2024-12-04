import { useState } from "react";
import { AuthService } from "../Axios.js/AuthService";
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { login } from "../Store/Store";

function Login() {
  const authservice = new AuthService()
  const dispatch = useDispatch()
  const [error,handleeroor] = useState("")
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber:0,
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit =async (e) => {
    e.preventDefault();
    
    const res = await authservice.signup(formData)
    console.log(res)
    if(res.data.user){
    await dispatch(login())
      navigate("/verifyEmail")
    }else{
      handleeroor(res.data.msg)
    }
    console.log("Form Submitted:", formData);
 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col gap-6 p-6 w-full max-w-md rounded-2xl shadow-lg"
      >
        <div>
{error}
        </div>
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Sign Up
        </h2>

       

        {/* Email Input */}
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
              value={formData.email}
              onChange={handleChange}
              className="p-3 w-full outline-none rounded-lg"
            />
          </div>
        </div>

        {/* Password Input */}
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
              value={formData.password}
              onChange={handleChange}
              className="p-3 w-full outline-none rounded-lg"
            />
          </div>
        </div>
        

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium p-3 rounded-lg hover:bg-blue-700 transition"
        >
          LogIn
        </button>

        {/* Already have an account */}
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;