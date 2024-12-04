import React, { useEffect, useState } from 'react'
import { AuthService } from '../Axios.js/AuthService'
import Loader from './Loader'

function UserHistory() {
const [items,setstate]= useState([])
useEffect(()=>{

const func = async()=>{
const res = await AuthService.getHistory()
console.log(res)

setstate(res.history)
console.log(items)
}
func()

},[])







  return (
    <div className="flex flex-wrap justify-center items-center w-full min-h-screen bg-gray-900 ">
    {items.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105"
          >
            <img
              src={item.ImageUrl}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-medium text-yellow-300 mb-2">
                {item.title.replace(/_/g, " ")}
              </h2>
              <div className="text-sm font-light text-yellow-300 space-y-1">
                <p>Price: ${item.price}</p>
                <p>Quality: {item.quality}/10</p>
                <p>Sold: {item.sold ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <Loader />
    )}
  </div>
  );
  
}

export default UserHistory