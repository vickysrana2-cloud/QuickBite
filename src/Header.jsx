import React, { useState } from 'react'
import RestauranteContainer from './RestauranteContainer';
import logo from "./assets/logo.png"
import { Link } from 'react-router';

const Header = () => {
  const [loginState ,setLoginState]=useState(true);

  const handalLoginState=()=>{
    setLoginState(!loginState);
  }

  return (
    <>
      <div className='flex justify-between bg-amber-300 px-12 min-h-7'>
  
        <img className='size-20' src={logo} alt="" />
    
        <div className='flex gap-20 items-center'>
          <Link to="/" className='text-xl'>Home</Link>
          <Link to="/about" className='text-xl'>About</Link>
          <Link to="/contact" className='text-xl'>Contact</Link>
          <button onClick={handalLoginState} className='border-2 rounded-2xl min-w-20 py-1 duration-300 hover:bg-cyan-400 hover:text-white '>{loginState? "logIn" :"Logout"}</button>
        </div>
      </div>
      
    </>
  )
}

export default Header;