import React, { useState } from 'react';
import { ImCancelCircle } from "react-icons/im";
export default function Sidebar({isSidebarOpen,setIsSidebarOpen}) {
  console.log(setIsSidebarOpen)
  const [value,setvalue] = useState(20)
  return (

    <aside
    className={`absolute left-2 h-50vh w-36 bg-gray-700 p-6 transform ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
  >
    
    
    <h2 className="text-xl  font-semibold mb-4 text-white">Filters</h2>
    <button
    onClick={() => setIsSidebarOpen(false)}
    className='flex gap-2'
    >
    Close <ImCancelCircle className='size-6 text-red-700'/>
    </button>
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2 mt-3 text-white">Genre</h3>
        <ul className="space-y-2">
          {["Fiction", "Non-fiction", "Science Fiction"].map((genre) => (
            <li key={genre}>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                <span className="ml-2 text-white">{genre}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-normal text-white">Price Range </h3>
        <span className="text-blue-500 text-base font-medium">Rs {value}</span>
      </div>
      <input
        type="range"
        min="20"
        max="70"
        value={value}
        onChange={(e) => setvalue(Number(e.target.value))}
        className="w-full"
      />
    </div>
    </div>
  </aside>
  
  );
}
