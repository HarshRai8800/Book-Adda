import React, { useEffect } from 'react'
import { AuthService } from '../../Axios.js/AuthService'
import { useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaHistory,FaHeart } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import MeCom from '../../components/MeCom';
function Profile() {

const [user,setUser] = useState()
const [err,seterr] = useState()
const [img,setImg] = useState()
const [Com,setCom]= useState(0)


const {email,password} = useSelector((state) => state.persistedReducer.user);
    


async function handleImg(file){
    try {
        console.log(file)
        const res = await AuthService.Img(file)
        console.log(res)
        if(res){
        setImg(res.avatar)
        }else{
            console.log("error")
        }
        
    }catch(error){
        console.log(error)
    }
}

useEffect(()=>{
  const func = async()=>{  
try {
    const res = await AuthService.profile(email,password)
     if(res){
        console.log(res)
setUser(res)
     }else{
        seterr('error occurd while fetching details')
     }
} catch (error) {
    console.log(error)
    seterr("profile cannot be fetched")
}}
func()

},[email,password])




  if(user){
    return(
       
        <div className='w-full h-screen flex  bg-black'>
        <div className='w-25vh h-full flex justify-center align-middle flex-row bg-zinc-800 p-5'>
          <div className='flex mt-6 flex-col  gap-4 text-white mb-6'>
            <img
              src={user.avatar}
              alt="Avatar"
              className='items-center size-52 rounded-full mb-2'
            />
           <input 
        type="file" 
        accept="image/*" // Restrict file types to images
        onChange={(e) => handleImg(e.target.files[0])} 
       className=' items-center'
        id="imageInput" // Provide an id for styling or triggering
      />
            <div className='text-xl mb-2 w-32  border-b-2 font-bold '>{user.username}</div>
            <div className='text-white w-48 mb-2 border-b-2  font-bold  '>{user.email}</div>
          </div>
      
          <div className='flex flex-col border-2 border-zinc-700 w-44 h-full items-center justify-around  gap-4 text-white'>
            
            <div className='flex w-40 text-center items-center p-4 border-b-2 ml-2 gap-4'>
                <FaHistory onClick={()=>setCom(1)} className='size-9 text-yellow-300' />
              <span className='text-lg'>History</span>
            </div>
            <div onClick={()=>setCom(2)} className ='flex w-40 text-center items-center p-4 border-b-2 ml-2 gap-4'>
                <FaCartShopping className='size-9 text-yellow-300' />
              <span className='text-lg'>Cart</span>
            </div>
            <div className='flex w-40 text-center items-center p-4 border-b-2 ml-2 gap-4'>
                <BsBoxSeamFill onClick={()=>{setCom(3)}}  className='size-9 text-yellow-300' />
              <span className='text-lg'>Order</span>
            </div>
            
            <div className='flex w-40 text-center items-center p-4 border-b-2 ml-2 gap-4'>
                <FaIndianRupeeSign onClick={()=>{setCom(4)}}  className='size-9 text-yellow-300' />
              <span className='text-lg'>Sold History</span>
            </div>
            <div className='flex w-40 text-center items-center p-4 border-b-2 ml-2 gap-4'>
                <FaClipboardList onClick={()=>{setCom(5)}}  className='size-9 text-yellow-300' />
              <span className='text-lg'>Listed</span>
            </div>
          </div>
        </div>
      
        <div className='w-full h-full '>
          <div className='text-white text-2xl mb-4'>
          <MeCom num={Com}/>
          



          </div>
          <div className='flex flex-wrap gap-6'>
          </div>
        </div>
      </div>
          
    )
  }else{
    return(
        <div>
            loading...
        </div>
    )
  }

  
}

export default Profile