import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthService } from "../../Axios.js/AuthService";
import { FaDownload } from "react-icons/fa";
import { AiTwotoneHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
function Book() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
console.log(data)
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await AuthService.bookId(id);
        if (res) {
          setData(res);
        } else {
          setError("Book not found");
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

 

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

 



  return (
    <div className="w-screen h-screen flex bg-black">
      <div className="w-1/2 h-full bg-zinc-800 flex items-center justify-center p-5 relative">
        <img
          src={data?.ImageUrl || "/placeholder-image.jpg"}
          alt="Book"
          className="object-contain h-full w-2/3"
        />
        <div className="flex flex-col ml-20 items-center justify-center gap-28 ml-6">
          <div>
          <AiTwotoneHeart className=" ml-2 text-6xl text-white cursor-pointer hover:scale-110 transition-transform text-red-500" />
          <h3 className="text-white">BoookMark</h3>
          </div>
          <div className="">
          <FaDownload onClick={()=>{
                      const url =
                      data.url;
                    const element = document.createElement("a");
                    element.href = url;
                    element.setAttribute("download"," custom-file.pdf");
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }
          }
            

          
          className="size-16 text-white"/>
    
      
    
          <h3 className=" mt-3 text-white">Download</h3>
          
          </div>
          
        </div>
      </div>
      <div className="w-1/2 h-full bg-zinc-900 flex flex-col justify-start gap-4 p-10">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            {data?.title || "Untitled"}
          </h1>
          <h3 className="text-white">By Harsh Rai</h3>
        </div>
        <p className="text-gray-300 text-lg">
          {data?.description || "No description available."}
        </p>
        <div className="flex justify-center items-center h-full">
  <Link
    to={data.ContentUrl}
    className="w-96 h-16 border-2  text-center flex items-center justify-center
      border-yellow-400 rounded-3xl font-bold text-2xl text-white bg-transparent
      hover:bg-yellow-300 hover:text-black transition-all duration-300"
  >
    Read PDF
  </Link>
</div>


      </div>
    </div>
  );
}

export default Book;
