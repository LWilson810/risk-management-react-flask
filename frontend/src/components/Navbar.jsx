import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../slices/userReducer"
const Navbar = () => {

  const dispatch = useDispatch();

  return (
    <div className="flex h-20 bg-[#141b2d] justify-between items-center sticky top-0 z-30">
      <h1 className="text-white text-xl mx-auto pl-20">Power Risk Manager</h1>
      <ul className="flex justify-end">
          <li>
            <img src="./src/assets/engrenagem.png" className="w-6 h-6 mr-4" />
          </li>
          <li>
            <span className="text-white mr-4 cursor-pointer" onClick={(e) => {
            dispatch(logoutUser());
          }}>Log Out</span>
          </li>
        
      </ul>
    </div>
  );
};

export default Navbar;
