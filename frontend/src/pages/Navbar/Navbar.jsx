import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiBookshelf } from "react-icons/gi";

function Navbar(props){
  const nanvigate = useNavigate()
  const [status,setstatus]= useState(false)
const data = useSelector((state)=>state.persistedReducer.user.status)
const res = useSelector((state)=>state.persistedReducer)
console.log(res)
console.log(data)
  useEffect(()=>{


setstatus(data)

  },[data])
  const link = [
    {
      path:"",
      status:true,
      name:"Home"
    },
    {
      path:"Read-Books",
      status:true,
      name:"Read Books"
    },
    {
      path:"Sell-Books",
      status:status,
      name:"Sell Books"
    },
    {
      path:"Buy-Books",
      status:status,
      name:"Buy Books"
    },
    {
      path:"/aboutUs",
    status:!status,
      name:"about Us"
    },
   {
      path:"/login",
      status:!status,
      name:"Login"
    },
    {
      path:"/signup",
      status:!status,
      name:"SignUp"
    },{
      path:"/profile",
      status:status,
      name:"Profile"
    },,{
      path:"/logout",
      status:status,
      name:"Logout"
    }
  ]













  return (
    <div className='m-0 w-screen h-16 bg-zinc-700 text-white flex items-center justify-between px-8'>

<div className="flex items-center justify-center">
      <GiBookshelf size={30} className=' text-yellow-300 bg-zinc-700 size-14' />
      <div className='text-4xl mt-4 ml-4 font-medium text-yellow-300'>BookAdda</div>
    </div>
  

<div className='flex gap-8 text-base items-center'>
  {link.map((element) => {
    if (element.status) {
      if (element.name === "Login" || element.name === "SignUp") {
        return (
          <button
          onClick={()=>nanvigate(element.path)}
            className='border border-red-400 rounded-md px-4 py-2 hover:bg-zinc-600 hover:border-zinc-400 transition-all duration-200'
            key={element.name}
          >
            {element.name} 
          </button>
        );
      } else {
        return (
          <div onClick={()=>nanvigate(element.path)} key={element.name} className='px-2'>
            {element.name}
          </div>
        );
      }
    }
  })}
</div>

</div>

  )
}

export default Navbar