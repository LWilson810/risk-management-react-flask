import React, { useEffect } from 'react';

// Router
import {Outlet} from "react-router-dom"

// Hooks

import Sidebar from './components/Sidebar';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function App() {

  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user);
  
  useEffect(() => {
    if(!userInfo.loggedIn) {
      navigate("/sign-in")
    }
  }, [])
  return (
    <div className='flex'>
      <Sidebar />
      
      <div className="flex flex-col w-full"> 
        {/* <div className="flex top-0"> */}
          <NavBar />    
        {/* </div> */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-[#141b2d]">
          <Outlet />
        </div>
        <Footer/>
      </div>
      
    </div>
    
  );
}

export default App;
