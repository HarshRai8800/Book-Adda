import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../Store/Context'
function Logout() {
    const navigate = useNavigate()
const dispatch = useDispatch()
useEffect(()=>{
dispatch(logout())
navigate("/")
},[])
}
export default Logout