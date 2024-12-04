import React from 'react'
import Cart from './cart'

import OrderHistory from './OrderHistory'
import UserHistory from './UserHistory'
import SoldHistory from './SoldHistory'
import Listed from './Listed'

function MeCom(num) {
  console.log(num)
if(num.num==1){
    return(
        <UserHistory/>
    )
}
 if(num.num==2){
  console.log("hio")
  return(
    
    <Cart/>
  )
}
if(num.num==3){
  return(
  <OrderHistory/>)
}
if(num.num==4)
{return(
  <SoldHistory/>
)}
if(num.num==5){
return (
  <Listed/>
)
}
}

export default MeCom