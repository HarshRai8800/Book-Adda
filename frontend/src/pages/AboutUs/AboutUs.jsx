import React from 'react'

function AboutUs() {
  return (
    <div>

<div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold text-yellow-300 mb-6 text-center">
        About Us
      </h1>
      <p className="text-xl text-gray-300 mb-10 text-center">
        Made with ❤️ by a passionate team of developers.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {[
          { name: "Harsh Rai", role: "Full Stack Developer" },
          { name: "Abhay Chaudhary", role: "TailWind Css Developer" },
          { name: "Harshit Kumar", role: "DataBase Developer" },
          { name: "Aditya Gond", role: "Team Manager" },
        ].map((member, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <div className="h-16 w-16 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl">
              {member.name.charAt(0)}
            </div>
            <h2 className="mt-4 text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-400 mt-2">{member.role}</p>
          </div>
        ))}
      </div>
      <footer className="mt-12 text-gray-500 text-center">
        © 2024 Made with ❤️ by Harsh Rai, Abhay Chaudhary, Harshit Kumar, Aditya Gond
      </footer>
    </div>
  

    </div>
  )
}

export default AboutUs