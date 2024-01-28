import React, { useState, useRef } from "react";
import "./Form.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const AlertError = (error) => {
  Swal.fire({
    title: "Error!",
    text: error,
    icon: "error",
    confirmButtonText: "OK",
  });
};

function Form() {
  const [formMusic, setFormMusic] = useState({
    name: "",
    nameMusic: "",
    singer: "",
  });
  const formRef = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormMusic({
      ...formMusic,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Validate form data
    if (formMusic.nameMusic === "" || formMusic.nameMusic.length < 3) {
      AlertError(
        "El campo de musica no puede estar vacio y con menos de 3 caracteres"
      );
    } else if (formMusic.singer === "" || formMusic.singer < 3) {
      AlertError(
        "El campo de artista no puede estar vacio y con menos de 3 caracteres"
      );
    } else if (formMusic.name === "" || formMusic.name.length < 3) {
      AlertError(
        "El campo de tu nombre no puede estar vacio y con menos de 3 caracteres"
      );
    } else if (
      formMusic.nameMusic !== "" &&
      formMusic.singer !== "" &&
      formMusic.name !== ""
    ) {
      //Make API call to Submit form data
      emailjs
        .sendForm(
          process.env.REACT_APP_SERVICES_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          formRef.current,
          process.env.REACT_APP_PUBLIC_KEY
        )
        .then(
          (result) => {
            if (result.text === "OK") {
              // Reset Form State
              setFormMusic({
                name: "",
                nameMusic: "",
                singer: "",
              });
            }
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  const font = {
    fontSize: 20,
  }

  return (
    <>
      <Header />
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="w-100 mb-2">
          <input
            type="text"
            name="nameMusic"
            value={formMusic.nameMusic}
            onChange={handleChange}
            placeholder="Canción"
            className="text-center"
            style={font}
          />
        </div>
        <div className="w-100 mb-2">
          <input
            type="text"
            name="singer"
            value={formMusic.singer}
            onChange={handleChange}
            placeholder="Artista"
            className="text-center"
            style={font}
          />
        </div>
        <div className="w-100 mb-2">
          <input
            type="text"
            name="name"
            value={formMusic.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="text-center"
            style={font}
          />
        </div>
        <hr />
        <div className="w-100">
          <button type="submit">ENVIAR</button>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default Form;
