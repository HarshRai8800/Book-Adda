import React, { useEffect, useState } from 'react'
import { AuthService } from '../Axios.js/AuthService'
import Loader from './Loader'
function OrderHistory() {
const [orders,setrorder]=useState()
console.log("hii")
useEffect(()=>{
    const fubc = async()=>{

        try {
            const res =await AuthService.gethisOrder()
            console.log(res.history.order)
        setrorder(res.history.order)
        console.log(orders[0].books.status)
        } catch (error) {
            
        }
    }


fubc()

},[])

return(
<div className='flex w-75vh flex-row gap-14 justify-between'>
{orders ?
  orders.map((item, index) => (
    <div
      key={index}
      className="bg-zinc-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-60 m-2 flex flex-col"
    >
      <div className="w-full h-32 flex items-center justify-center p-1">
        <img
          src={item.books.ImageUrl}
          alt={`Book ${index}`}
          className="object-contain h-full w-full"
        />
      </div>
      <div className="p-2 flex flex-col gap-1 h-40">
        <h3 className="text-lg font-bold text-white">
          {item.books.title || "Untitled"}
        </h3>
       
        <p className="text-white text-sm">
          {"Price Rs " + item.books.price}
        </p>
        
        <div className="flex gap-1 mt-2">
         
          <button
           
            className="bg-red-500 text-white font-normal text-base rounded-2xl w-52 h-12  hover:bg-red-600 transition"
          >
           {item.status}
          </button>
        </div>
      </div>
    </div>
  ))
  : <Loader/>}
</div>
)
}

export default OrderHistory