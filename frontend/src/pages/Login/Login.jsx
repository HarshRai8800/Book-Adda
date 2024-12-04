import React from "react";
import { useForm } from "react-hook-form";
import  {AuthService}  from "../../Axios.js/AuthService.js";
import { useDispatch } from "react-redux";
import { login, setStatus } from "../../Store/Context";
import { useNavigate } from "react-router-dom";
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
const navigate = useNavigate()
  const submit = async (data) => {
    try {
      console.log(data)
      const res = await AuthService.login(data)
      if (res) {
        console.log({username:res.user.username,email:res.user.email,password:res.user.password,
          phonenumber:res.user.phonenumber,otp:res.user.OtpMail,id:res.user._id
        })
        dispatch(setStatus())
        dispatch(login({username:res.user.username,email:res.user.email,password:res.user.password,
          phonenumber:res.user.phonenumber,id:res.user._id}
        ));
        alert("Login successful!");
        navigate("/Read-Books")
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };




  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(submit)} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold text-center mb-4">Login</h2>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must be at least 8 characters long and include a number",
              },
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
