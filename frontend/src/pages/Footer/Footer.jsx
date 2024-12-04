import React from 'react'

function Footer() {
  return (
    <div className='w-70vh bg-gray-800 text-white text-center h-30vh py-4'>
    {/* <div className='text-3xl ont-bold'>
      &copy; Made with Love by Harsh RAI
    </div> */}
    <footer className="bg-gray-800 mx-auto w-3/4 text-gray-300 py-10 rounded-md shadow-lg">
  <div className="flex flex-col items-center">
    <div className="mb-6 text-center">
      <h1 className="text-2xl font-semibold text-yellow-300">
        BookAdda
      </h1>
      <p className="text-sm mt-2">
        © {new Date().getFullYear()} BookAdda.  All Rights Reserved.
      </p>
    </div>
    <div className="flex space-x-8">
      <a
        href="/aboutUs"
        className="text-sm hover:text-yellow-300 transition duration-300"
      >
        About Us
      </a>
      <a
        href="/"
        className="text-sm hover:text-yellow-300 transition duration-300"
      >
        Contact
      </a>
      <a
        href="/"
        className="text-sm hover:text-yellow-300 transition duration-300"
      >
        Privacy Policy
      </a>
    </div>
  </div>
</footer>
  </div>
  )  
}

export default Footer