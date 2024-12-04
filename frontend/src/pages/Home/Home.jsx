import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Recent_component from '../../components/Recent-Component';
import { logout, setStatus } from '../../Store/Context';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Home() {
const navigater = useNavigate()
  const {email} = useSelector((state) => state.persistedReducer.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(email.length<=0){
      dispatch(logout())
    }
  },[email])
  // console.log(res)
  // if(res.email.length<=0){
  //  try {
  //    console.log("in")
  //    useDispatch(logout())
  //  } catch (error) {
  //   console.log(error)
  //  }
  // }
  return (
  <>
  <div className='flex '>
  <div className="w-full h-[70vh] flex bg-zinc-800 text-white">
   
  


  <div className="w-1/2 flex flex-col justify-center items-start px-20 gap-6">
  
     <div className="font-bold text-yellow-300 text-6xl leading-tight">
       Discover Your Next <br />
       Great Thing
     </div>
    
     
     <p className="text-lg text-gray-300">
       Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
     </p>
     <button onClick={()=>navigater("/Read-Books")} className="px-8 py-4 w-3/4 border-2 border-yellow-300 text-yellow-300 text-xl font-medium rounded-full hover:bg-zinc-500 transition-all duration-200">
 Discover Books
</button>

   </div>

 

  
 </div>
 
</div>
<div>
<Recent_component/>
  
</div>
  </>
    
  
  );
  
}

export default Home