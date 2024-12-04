import React, { useEffect, useState } from "react";
import { AuthService } from "../../Axios.js/AuthService";
import PdfComponent from "../../components/pdfComponent";

function AllBooks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await AuthService.allBooks();
        if (res) {
          console.log(res);
          setData(res);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <div className="bg-black min-h-screen w-screen">
  <h1 className="pt-8 text-yellow-300 text-center text-4xl py-5">Read Books</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
    {data && data.length > 0 ? (
      data.map((item, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <PdfComponent key={index} index={index} item={item} />
        </div>
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
        </div>)
}

export default AllBooks;
