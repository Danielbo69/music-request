import React from 'react'
import { SlArrowDown } from "react-icons/sl";
import ImgMusic from '../../assets/img/Botonsitos social media-04.png'
import ImgDesign from '../../assets/img/Botonsitos social media-05.png'
import './Footer.css'
function Footer() {
  return (
    <div className='footer w-100 h-auto'>
        <div className='d-flex justify-content-evenly'>
            <div className='d-flex justify-content-center flex-column align-items-center'>
                <label className='text-white'>MUSIC</label>
                <SlArrowDown color='white' fontSize={30} />
                <img src={ImgMusic} alt={ImgMusic} />
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center'>
                <label className='text-white'>GRAPHIC DESIGN</label>
                <SlArrowDown color='white' fontSize={30} />
                <img src={ImgDesign} alt={ImgDesign} />
            </div>
        </div>


    </div>
  )
}

export default Footer