import React, { useEffect, useState } from 'react'
import { AuthService } from '../Axios.js/AuthService'
import { FaStar } from "react-icons/fa";
import Loader from './Loader';
import { autoBatchEnhancer } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
function Cart() {
const [data,setData] = useState([])
const {id} = useSelector((state) => state.persistedReducer.user);

const star = Array.from({ length: data.quality || 0 });
console.log("inside")
const fuc =async()=>{
  try {
  const res = await AuthService.getCart()
  console.log(res)
  if(res){
    console.log(res)
      setData(res.data)
  }
} catch (error) {
  
}}
useEffect(()=>{

fuc()


},[])


async function orderItem(index) {
  try {
    console.log(index)
    console.log(data)
   const price = data[index].price
  
   const dat = data[index]
       const res = await AuthService.listOrder(dat,id)
       
    
  console.log(window)
  } catch (error) {
    console.log(error)
  }


}

 async function removeItem(){
try {
  console.log(data[0])
  const id = data[0]._id
    const res = await AuthService.DeleteCart(id)
    console.log(res)
    fuc()
    if(res){
        alert("book deleted from cart"+data.title)
    }
} catch (error) {
    
}


 }

  return (
    <div className='flex w-75vh flex-row gap-14 justify-normal'>
    {data.length > 0 ?
      data.map((item, index) => (
        <div
          key={index}
          className="bg-zinc-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-60 m-2 flex flex-col"
        >
          <div className="w-full h-32 flex items-center justify-center p-1">
            <img
              src={item.ImageUrl}
              alt={`Book ${index}`}
              className="object-contain h-full w-full"
            />
          </div>
          <div className="p-2 flex flex-col gap-1 h-40">
            <h3 className="text-lg font-bold text-white">
              {item.title || "Untitled"}
            </h3>
           
            <p className="text-white text-sm">
              {"Price Rs " + item.price}
            </p>
            <div className="flex">
              {star.map((_, starIndex) => (
                <FaStar key={starIndex} className="text-yellow-500" />
              ))}
            </div>
            <div className="flex gap-1 mt-2">
              <button
                onClick={()=>{orderItem(index)}}
                className="bg-yellow-300 font-medium text-lg w-52 h-12 rounded-2xl text-white   hover:bg-yellow-200 transition"
              >
                BUY NOW
              </button>
              <button
                onClick={()=>removeItem()}
                className="bg-red-500 text-white font-normal text-base rounded-2xl w-52 h-12  hover:bg-red-600 transition"
              >
                Delete from Cart
              </button>
            </div>
          </div>
        </div>
      ))
      : <Loader/>}
  </div>
)
}



export default Cart