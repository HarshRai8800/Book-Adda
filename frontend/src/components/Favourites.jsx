import React, { useEffect, useState } from 'react'
import { AuthService } from '../Axios.js/AuthService'
import { FaStar } from "react-icons/fa";
function Favourites() {
const [data,setData] = useState([])


    const star = Array.from({ length: data.quality || 0 });
console.log("inside")
useEffect(()=>{
const fuc =async()=>{
    try {
    const res = await AuthService.getFav()
    console.log(res.data)
    if(res){
        setData(res.data)
    }
} catch (error) {
    
}
}
fuc()


},[])



  return (
    <div className='flex w-75vh flex-row gap-14 justify-between'>
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
            <h3 className="text-md font-bold text-white">
              {item.title || "Untitled"}
            </h3>
            <p className="text-white text-sm">
              {item.description || "No description available."}
            </p>
            <p className="text-white text-sm">
              {"Price Rs " + item.price}
            </p>
            <div className="flex">
              {star.map((_, starIndex) => (
                <FaStar key={starIndex} className="text-yellow-300" />
              ))}
            </div>
            <div className="flex gap-1 mt-2">
              <button
                
                className="bg-yellow-300 font-medium text-lg w-52 h-12 rounded-2xl text-white  rounded hover:bg-yellow-200 transition"
              >
                Add To Cart
              </button>
              <button
                
                className="bg-red-500 text-white font-normal text-base rounded-2xl w-52 h-12 rounded hover:bg-red-600 transition"
              >
                Delete from Favorites
              </button>
            </div>
          </div>
        </div>
      ))
      : <div className="text-white">hello</div>}
  </div>
)
}



export default Favourites