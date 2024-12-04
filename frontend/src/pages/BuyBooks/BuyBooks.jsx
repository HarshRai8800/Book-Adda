// import React, { useEffect, useState, useCallback } from "react";
// import { AuthService } from "../../Axios.js/AuthService";
// import BookComponent from "../../components/BookComponent";

// function BuyBooks() {
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true); // Track if there are more books to fetch

//   const fetchAllBooks = useCallback(async () => {
//     console.log("in")
//     if(!hasMore)return 
//     else{
//       try {
//         console.log(page)
//         const res = await AuthService.allbooks(page);
//         if (res?.find?.length > 0) {
//           setData((prevData) => [...prevData, ...res.find]);
//         } else {
//           setLoading(false)
//           setHasMore(false); // No more data to fetch
//         }
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
   
//   }, [page]);

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     else{
//       const heightOfWindow = window.innerHeight;
//       const heightOfScrolled = document.documentElement.scrollTop;
//       const heightOfContent = document.documentElement.scrollHeight;
  
  
  
//       if ( heightOfWindow + heightOfScrolled + 50 >= heightOfContent) {
        
//         setLoading(true)
//         setPage((prevPage) => prevPage + 1);
       
//       }
//     }
   
    
//   }, []);

//   useEffect(() => {
//     fetchAllBooks();
//   }, [fetchAllBooks]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className="bg-black min-h-screen w-screen">
//       <h1 className="ml-24 pt-8 text-yellow-300 text-center font-normal text-5xl py-5">
//         Book Store
//       </h1>
//       <div className="flex flex-wrap justify-around gap-6 px-6">
//         {data && data.length > 0 ? (
//           data.map((item, index) => (
//             <div key={index} className="mt-8 ml-6 w-64 justify-between gap-4">
//               <BookComponent index={index} item={item} />
//             </div>
//           ))
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-screen p-6">
//             {Array(3)
//               .fill("")
//               .map((_, index) => (
//                 <div
//                   key={index}
//                   className="animate-pulse bg-gray-800 rounded-lg shadow-md overflow-hidden"
//                 >
//                   <div className="w-full h-56 bg-gray-700"></div>
//                   <div className="p-4 space-y-3">
//                     <div className="h-4 bg-gray-700 rounded w-3/4"></div>
//                     <div className="h-3 bg-gray-700 rounded w-1/2"></div>
//                     <div className="h-3 bg-gray-700 rounded w-1/4"></div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}
//       </div>
//       {
//         !hasMore?<div className="text-center text-gray-500 mt-8">
//         <div className="flex flex-col items-center">
//           <svg
//             className="w-16 h-16 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M3 10h11M9 21V3m4 18V3m2.5 8.5a2.5 2.5 0 115 0v1a2.5 2.5 0 01-5 0v-1z"
//             ></path>
//           </svg>
//           <p className="text-lg font-medium mt-2">No more books to display!</p>
//         </div>
//       </div>:<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-screen p-6">
//       {Array(3)
//         .fill("")
//         .map((_, index) => (
//           <div
//             key={index}
//             className="animate-pulse bg-gray-800 rounded-lg shadow-md overflow-hidden"
//           >
//             <div className="w-full h-56 bg-gray-700"></div>
//             <div className="p-4 space-y-3">
//               <div className="h-4 bg-gray-700 rounded w-3/4"></div>
//               <div className="h-3 bg-gray-700 rounded w-1/2"></div>
//               <div className="h-3 bg-gray-700 rounded w-1/4"></div>
//             </div>
//           </div>
//         ))}
//     </div>
//       }
      
//     </div>
//   );
// }

// export default BuyBooks;



import React, { useEffect, useState, useCallback } from "react";
 import { AuthService } from "../../Axios.js/AuthService";
import BookComponent from "../../components/BookComponent";
import Sidebar from "../../components/Sidebar";
import BestSellers from "../../components/BestSeller";

export default function BuyBooks() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen,setSidebarOpen]=useState(false)
  const [filter,Setfilter]= useState({
    price:35,
    quality:5,
    name:""
  })
  const [hasMore, setHasMore] = useState(true);

  const fetchAllBooks = useCallback(async () => {
    if (!hasMore) return;
    try {
      setLoading(true);
      const res = await AuthService.allbooks(page);
      if (res?.find?.length > 0) {
        setData((prevData) => [...prevData, ...res.find]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchAllBooks();
    }
  }, [loading, hasMore, fetchAllBooks]);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return(
    
    <div className="min-h-screen bg-gray-900 text-white">
     <header className="bg-gray-800 py-4 shadow-md flex  justify-center w-full  z-50">
        

        {!sidebarOpen? 
        <button
          className="  p-2 absolute left-6 bg-gray-700 text-white rounded-md focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        :<Sidebar isSidebarOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen}/>}
       
       <h1 className="text-3xl font-bold text-center text-white">BookAdda Store</h1>
      </header>
      <div className="flex">
        
        <main className="flex-1 p-6">
          <BestSellers />
          <h2 className="text-2xl font-semibold mb-6 mt-12">All Books</h2>
          <div className="space-y-8">
            {data.map((item, index) => (
              <BookComponent key={item._id} index={index} item={item} />
            ))}
            {loading && <LoadingBooks />}
            {!hasMore && <NoMoreBooks />}
          </div>
        </main>
      </div>
    </div>
  );
}

function LoadingBooks() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse flex space-x-4 bg-gray-800 p-4 rounded-lg">
          <div className="w-1/3 h-64 bg-gray-700 rounded"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NoMoreBooks() {
  return (
    <div className="text-center text-gray-400 mt-8">
      <svg className="mx-auto w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
      <p className="text-lg font-medium mt-2">No more books to display!</p>
    </div>
  );
}
