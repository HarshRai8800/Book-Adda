import { useState } from 'react'
import Footer from './pages/Footer/Footer'
import Navbar from './pages/Navbar/Navbar'
import Home from './pages/Home/Home'
import { Outlet } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import store from "./Store/Store.js"
function App() {
  const [count, setCount] = useState(0)
function change(){

}
  return (
    <div className="w-screen">
      <Provider store={store}>
    <Navbar props={change} />
    <Outlet/>
    <Footer />
</Provider>
  </div>
  
  
  
  )
}

export default App
