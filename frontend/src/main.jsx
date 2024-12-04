import { Profiler, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Logout from './pages/Logout.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Favourites from './pages/Favourites/Favourites.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';

import AllBooks from './pages/AllBooks/AllBooks.jsx';
import OtpMail from './components/OtpMail.jsx';
import SellBooks from './pages/SellBooks.js/SellBooks.jsx';
import BuyBooks from './pages/BuyBooks/BuyBooks.jsx';

import { Provider } from 'react-redux';
import store from './Store/Store.js';
import Book from './pages/BookId/Book.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './Store/Store.js';
import Profile from './pages/Profile.jsx/profile.jsx';
import Verification from './pages/Cart/Verification.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Parent component
    children: [
      {
        index: true,
        path:"/", // Default route
        element: <Home />,
      },
      {
        index: true,
        path:"/Read-Books", // Default route
        element:<AllBooks/>
      },
      {
        index: true,
        path:"/Sell-Books", // Default route
        element: <SellBooks/>,
      },
      {
        index: true,
        path:"/Buy-Books", // Default route
        element: <BuyBooks/>,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path:"logout",
        element:<Logout/>
      },
      {
        path: "aboutUs",
        element: <AboutUs />,
      },
      
    
      ,{
        path:"verifyEmail",
        element:<OtpMail/>
      },
      {
        path:"book/:id",
        element:<Book/>
      },
      {
        path:"/profile",
        element:<Profile/>
      }
    ]
  },{
    path:"/verification",
    element:<Verification/>
  },
  {
    path: "login",
    element: <Login />,
  }, {
    path: "signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
    </Provider>
  
);

