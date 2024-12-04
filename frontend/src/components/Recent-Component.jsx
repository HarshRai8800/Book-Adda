import React, { useEffect, useState } from "react";
import { AuthService } from "../Axios.js/AuthService";
import PdfComponent from "./pdfComponent";
function RecentComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const res = await AuthService.recentBook();
        if (res) {
          console.log("Fetched Data:", res);
          setData(res);
        }
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };
    fetchRecentBooks();
  }, []);

  return (
    <div className="w-full p-5 bg-zinc-800 min-h-screen">
      <h2 className="text-6xl font-medium text-left ml-14 mb-6 text-yellow-300">
        Recent Books
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <PdfComponent  index={index} item={item} />
          ))
        ) : (
        

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-screen p-6">
      {Array(3)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="w-full h-56 bg-gray-700"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
    </div>
  
      



        )}
      </div>
    </div>
  );
  
}

export default RecentComponent;

