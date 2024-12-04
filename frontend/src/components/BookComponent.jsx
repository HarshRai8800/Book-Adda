// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate, Link } from 'react-router-dom'
// import { FaStar } from "react-icons/fa";
// import { AuthService } from '../Axios.js/AuthService';

// export default function BookComponent({ index, item }) {


// const handleClick = async()=>{
//     try {
//         const res =await AuthService.addToCart(item._id)
// console.log(res)
// if(res){
//     alert("Book added To cart : "+item.title )
// }else{
//     alert("Book already added to cart ")
// }
//     } catch (error) {
//         alert("error has occured")
//     }
// }






//   const star = Array.from({ length: item.quality || 0 });

//   return (
//     <div
//   key={index}
//   className="bg-zinc-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
// >
//   <div className="w-full h-48 bg-zinc-800 flex items-center justify-center p-2">
//     <img
//       src={item.ImageUrl}
//       alt={`Book ${index}`}
//       className="object-contain w-full h-full"
//       style={{ objectFit: 'cover', aspectRatio: '1 / 1' }} // Ensures a square aspect ratio for all images
//     />
//   </div>
//   <div className="pl-4 gap-2 h-48">
//     <h3 className="text-lg font-bold text-white">
//       {item.title || "Untitled"}
//     </h3>
//     <p className="text-white mb-1 text-xs mt-1 overflow-y-auto h-12 max-h-24">
//       {item.description || "No description available."}
//     </p>

//     <p className="text-white mb-1 text-sm mt-1">
//       {"Price" + " " + "Rs" + " " + item.price}
//     </p>
//     <div className="flex">
//       {star.map((_, index) => (
//         <FaStar key={index} className="text-yellow-300 m-1 mb-4" />
//       ))}
//     </div>
//     <Link
//       onClick={handleClick}
//       className="mt-12 bg-yellow-300 text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
//     >
//       Add To Cart
//     </Link>
//   </div>
// </div>

//   );
// }

import React from 'react';
import { FaStar } from "react-icons/fa";
import { AuthService } from '../Axios.js/AuthService';

export default function BookComponent({ index, item }) {
  const handleClick = async () => {
    try {
      const res = await AuthService.addToCart(item._id);
      console.log(res);
      if (res) {
        alert("Book added To cart : " + item.title);
      } else {
        alert("Book already added to cart");
      }
    } catch (error) {
      alert("An error has occurred");
    }
  };

  const stars = Array.from({ length: item.quality || 0 });

  return (
    <div className="flex bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="w-1/4">
        <img
          src={item.ImageUrl}
          alt={item.title || "Book cover"}
          className="w-full h-full object-cover"
          style={{ aspectRatio: '2/3' }}
        />
      </div>
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{item.title || "Untitled"}</h3>
          <p className="text-gray-400 mb-4 line-clamp-3">{item.description || "No description available."}</p>
          <p className="text-lg font-semibold mb-2">₹{item.price.toFixed(2)}</p>
          <div className="flex mb-4">
            {stars.map((_, index) => (
              <FaStar key={index} className="text-yellow-400 mr-1" />
            ))}
          </div>
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 self-start"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}






