import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
export default function PdfComponent({index,item}) {
    const navigate = useNavigate()
//  function submitHandler(){
//    console.log("inside")
// navigate(`book/${item._id}`)

//  }
console.log(useSelector((state)=>state.persistedReducer.user.status))
console.log(item)
  return (
    <div
              key={index}
              className="bg-zinc-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full h-40 bg-zinc-800 flex items-center justify-center p-2">
                <img
                  src={item.ImageUrl}
                  alt={`Book ${index}`}
                  className="object-contain h-full w-full"
                />
              </div>
              <div className="p-4 gap-8 h-30">
                <h3 className="text-lg  font-bold text-white">
                  {item.title || "Untitled"}
                </h3>
                <p className="text-white mb-4 text-sm mt-2">
                  {item.description || "No description available."}
                </p>
                <Link to={`http://localhost:5173/book/${item._id}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Learn More
                </Link>
              </div>
            </div>

  )
}

