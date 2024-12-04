import {createSlice} from "@reduxjs/toolkit"

const initialState={
  id:"",
    username:"",
    email:"",
    password:0,
    phonenumber:0,
    status:false
}

const SetReducer = createSlice({
    name:"user",
    initialState,
  reducers:{
    login:(state,actions)=>{
      
      console.log(state)
      console.log(actions)
      state.id=actions.payload.id
      state.email=actions.payload.email
      state.password=actions.payload.password
      state.username = actions.payload.username
      state.username=actions.payload.phonenumber
      console.log(state)
      
    },
    setStatus:(state,actions)=>{
      state.status=true
    },
    logout:(state,action)=>{
      console.log("in")
      state.status=false
    },
   
  }    
})
export const {logout,login,setStatus} = SetReducer.actions


export default SetReducer.reducer