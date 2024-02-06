import React from "react";
import { SlArrowDown } from "react-icons/sl";
import ImgMusic from "../../assets/img/Botonsitos social media-04.png";
import ImgDesign from "../../assets/img/Botonsitos social media-05.png";
import ImgTitleM from "../../assets/img/Palabras pequeñas-07.png";
import ImgTitleD from "../../assets/img/Palabras pequeñas-08.png";
import ImgTitleLogo from "../../assets/img/Music & Graphic Design STUDIO-06.png";
import "./Footer.css";
function Footer() {
    const styleA = {
        textDecoration: "none",
        cursor: 'pointer'
    }
  return (
    <div className="footer w-100 h-auto">
      <div className="d-flex justify-content-evenly">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img style={{ width: 60 }} src={ImgTitleM} alt="MUSIC" />
          <SlArrowDown className="mb-1" color="white" fontSize={20} />
          <a href="https://www.instagram.com/ochoamusicstudio?igsh=MXNxM3BlYTU0MXNneQ==" style={styleA} target="_blank" rel="noopener noreferrer">
            <img src={ImgMusic} alt={ImgMusic} />
          </a>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img style={{ width: 150 }} src={ImgTitleD} alt="GRAPHIC DESIGN" />
          <SlArrowDown className="mb-1" color="white" fontSize={20} />
          <a href="https://www.instagram.com/ochoastudio?igsh=OHN3MHRpYTg5dHgz" style={styleA} target="_blank" rel="noopener noreferrer">
            <img src={ImgDesign} alt={ImgDesign} />
          </a>
        </div>
      </div>
      <div className="titleLogo w-100 h-auto col d-flex justify-content-center">
        <img src={ImgTitleLogo} alt="Music & Graphic Design Studio" />
      </div>
    </div>
  );
}

export default Footer;
