import React from 'react'
import ImageLogo from '../../assets/img/Logo Ochoa Studio PNG-07.png'
import { SlArrowDown } from "react-icons/sl";
import './Header.css'
function Header() {
  return (
    <div className='header d-flex justify-content-center align-items-center flex-column w-100 h-auto'>
        <img className='h-auto' src={ImageLogo} alt={ImageLogo} />
        <label className='text-white mt-2' id='title' style={{fontSize: '23px', letterSpacing: 0.7}}>¡Solicita una canción!</label>
        <SlArrowDown className='mt-2' color='white' fontSize={30} />
    </div>
  )
}

export default Header