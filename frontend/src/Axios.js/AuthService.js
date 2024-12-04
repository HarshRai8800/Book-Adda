import axios from "axios";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";


class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5675/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true
    });
   
  }
async allbooks(page){
  try {
 console.log("i am in")
    const res = await this.api.get("user/get-books-all" ,{
      headers:{
        page:page
      }
    });
    console.log( res);
    if(res.data.find.length==0){
      return res.data
    }
    return res.data; 
  } catch (error) {
    console.error("Login error:", error);
    return null; 
}
}

  async login({ email, password }) {
    try {
      console.log("Login attempt:", email, password);
      const res = await this.api.post("user/login", { email:String(email),password:String(password) });
      console.log("Login response:", res);
      return res.data; 
    } catch (error) {
      console.error("Login error:", error);
      return null; 
  }
  }

 async addToCart(id){
  try {
console.log(id)
const res = await this.api.post(
  "cart/add-books",
  { id }, // Send the ID in the request body
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
    console.log( res);
    return res.data; 
  } catch (error) {
    console.error("error while adding to cart:", error);
    return null; 
}
 }

  async signup({ username, email, password, adress, phonenumber }) {
    try {
      console.log("Signup attempt:", username, email,password, adress, phonenumber);
      const res = await this.api.post("user/sigup", {
        username,
        email,
        password,
        phonenumber: Number(phonenumber), 
        adress,
      });
      console.log("Signup response:", res);
      return res.data;
    } catch (error) {
      console.error("Signup error:", error);
      return null;
    }
  }

async profile(email,password){

  
    try{
    const res =await this.api.get("/user/get-user-information")
    console.log(res)
    if(res){
      return await res.data.user
    }
    else{
      return false
    }
      
    } catch (error) {
      console.log(error)
      return false
    }
  

}

 listBook=async({title,description,price,quality,avatar})=>{
try {
const formdata = new FormData()

formdata.append("avatar",avatar[0])
formdata.append("title",title)
formdata.append("description",description)
formdata.append("quality",quality)
formdata.append("price",price)

  const res = await this.api.post("/books/list-book",formdata,{
    headers:{
     "Content-Type": "multipart/form-data",
    }

  })
  console.log(res)
  if(res.status==200){
console.log(res.data)
return res.data.book

  }
} catch (error) {
  console.log(error)
  return null
}



}

async getHistory(){
  try {
    const res =await this.api.get("/user/history")
    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    
  }
}

async gethisOrder(){
try {
  const res =await this.api.get("/order/order-history")
  console.log(res)
  return res.data
} catch (error) {
  
}
}

async getSoldHistory(){
  try {
    const res =await this.api.get("/user/history2")
    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    
  }
}
async getListedHistory(){
  try {
    const res =await this.api.get("/user/history3")
    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    
  }
}

async Img (file){
  try {
    const formData =new FormData()
    formData.append('avatar',file)
    const res =await this.api.post("/user/change-avatar",formData, {
headers:{
  "Content-Type":"multipart/form-data"
}
    })
    console.log(res)
    if(res){
      return await res.data.change
    }
    else{
      return false
    }
      
    } catch (error) {
      console.log(error)
      return false
    }
}
 
async verify({  otp }) {
    try {
        console.log(otp)
      console.log("OTP verification attempt:",  otp);
      const res = await this.api.post("verify/check-otp", {  otp });
      console.log("Verification response:", res);
      return res.data;
    } catch (error) {
      console.error( error);
      return null;
    }
  }
async resend (){
    try {
      console.log("hi")
      const res = await this.api.post("verify/resend-otp")
      console.log(res)
      return true
    } catch (error) {

      console.log(res)
      return false
    }
  }

async getFav (){
  try {
    const res = await this.api.get("/favourites/find-favourites-book")
    console.log(res)
    if(res){
      return res.data
    }

else{
  return null
}
  } catch ( err) {
    console.log(err)
  }
}
async addFav (){
  try {
    const res = await this.api.get("/favourites/add-book_favourite")
    console.log(res)
    if(res){
      return res.data
    }

else{
  return null
}
  } catch ( err) {
    console.log(err)
  }
}
async deleteFav (){
  try {
    const res = await this.api.get("/favourites/delete_book_from_favourites")
    console.log(res)
    if(res){
      return res.data
    }

else{
  return null
}
  } catch ( err) {
    console.log(err)
  }
}
async getCart (){
  try {
    console.log("inside")
    const res = await this.api.get("/cart/find-from-cart")
    console.log(res)
    if(res){
      return res.data
    }

else{
  return null
}
  } catch ( err) {
    console.log(err)
  }
}
//  confirmOrder=async(dat)=>{
//  try {
//    const get =await this.api.post("/order/place-order",{
//      book:dat
//      })
//      if(get.status==200){
//       return get
//      }
//  } catch (error) {
//   console.log(error)
//  }
// }

 listOrder=async(dat,id)=>{
  try {
  const price = dat.price
 console.log(dat._id,id)
    // Step 1: Create Order on Backend
    const { data: { order } } = await this.api.post("http://localhost:5675/api/v1/order/create-order", {
      amount: price,
    });
  
    // Step 2: Get Razorpay Key from Backend
    const { data: { key } } = await this.api.post("http://localhost:5675/api/v1/order/razor-key");
    console.log(key);
    console.log(order);
    const book = dat._id
  
    // Step 3: Razorpay Checkout Options
    var options = {
      "key": key, 
      "amount": price,
      "currency": "INR",
      "name": "Book Adda",
      "description": "Test Transaction",
      "image": "https://avatars.githubusercontent.com/u/153977193?...",
      "order_id": order.id,
      "callback_url": "http://localhost:5675/api/v1/order/verification-order", // Optional
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000",
      },
      "notes": {
        "address": "Razorpay Corporate Office",
      },
      "theme": {
        "color": "#3399cc",
      },
      handler: async (response) => {
        console.log("Razorpay response:", response);
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        const verifyResponse = await fetch("http://localhost:5675/api/v1/order/verification-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            book: dat._id,
            id
          }),
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.msg === "sucessfull") {
          alert("Payment successful");
          redirect("http://localhost:5173/verification")
        } else {
          alert("Payment Failed!");
        }
      },
    };

    
    const razor = new window.Razorpay(options);
    razor.open();
  return true
  } catch (error) {
    console.error("Error in payment processing:", error);
  }
  


}


async getOrder (){
  try {
    const res = await this.api.get("/order/order-history")
    console.log(res)
    if(res){
      return res.data
    }

else{
  return null
}
  } catch ( err) {
    console.log(err)
  }
}
async DeleteCart(id){
  try {
    console.log(id)
    const res = await this.api.delete("/cart/delete_book",{
      headers:{
        id
      }
    })
    console.log(res)
    if(res){
      return res.data
    }
    else{
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

async recentBook(){
  try {
    const res = await this.api.get("/pdf/get-recent")
    if(res){
      console.log(res)
      return res.data.find
    }else{
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

async allBooks(){
 try {
  const res =await this.api("/pdf/get-content")

if(res){
  console.log(res.data.find)
  return res.data.find
}else{
  return false
}
   


 } catch (error) {
  
  console.log(error)
  return false
 }
}

async bookId(id){
  try {
    console.log(id)
    const res =await this.api.post("/pdf/get-by-id",{
      id:id
    })
  console.log(res)
  if(res){
    console.log(res.data.find)
    return res.data.find
  }else{
    return false
  }
     
  
  
   } catch (error) {
    
    console.log(error)
    return false
   }

}

}

const authServiceInstance = new AuthService();
export { authServiceInstance as AuthService };
