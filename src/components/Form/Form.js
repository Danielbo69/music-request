import React, { useState, useRef, useEffect } from "react";
import "./Form.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const AlertError = (title, text, icon, button) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    customClass: {
      confirmButton: button,
      cancelButton: button
    },
    confirmButtonText: "OK",
    cancelButtonText: "OK",
    buttonsStyling: false
  });
};

function Form() {
  const [formMusic, setFormMusic] = useState({
    name: "",
    nameMusic: "",
    singer: "",
  });
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const formRef = useRef();

  // Verifica al cargar la página si el correo ya fue enviado
  useEffect(() => {
    if (localStorage.getItem("correoEnviado") === "true") {
      setCorreoEnviado(true);
    }
  }, []);

  // Guarda el estado correoEnviado en el localStorage
  useEffect(() => {
    localStorage.setItem("correoEnviado", correoEnviado);
  }, [correoEnviado]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormMusic({
      ...formMusic,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (correoEnviado) {
      // El usuario ya envió un correo en los últimos 5 minutos, puedes mostrar un mensaje o bloquear el envío
      AlertError("¡ESPERA!", "Debes esperar 5 minutos para solicitar otra canción.", "warning", "btn btn-danger");
      return;
    }

    // Validate form data
    if (formMusic.nameMusic === "" || formMusic.nameMusic.length < 3) {
      AlertError(
        "¡Error!",
        "El campo de musica no puede estar vacio y con menos de 3 caracteres",
        "error",
        "btn btn-danger"
      );
    } else if (formMusic.singer === "" || formMusic.singer < 3) {
      AlertError(
        "¡Error!",
        "El campo de artista no puede estar vacio y con menos de 3 caracteres",
        "error",
        "btn btn-danger"
      );
    } else if (formMusic.name === "" || formMusic.name.length < 3) {
      AlertError(
        "¡Error!",
        "El campo de tu nombre no puede estar vacio y con menos de 3 caracteres",
        "error",
        "btn btn-danger"
      );
    } else if (correoEnviado === false) {
      // Make API call to Submit form data
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
              // Actualiza el estado indicando que el correo ha sido enviado y guarda el tiempo
              setCorreoEnviado(true);

              // Configura un temporizador para resetear el estado después de 5 minutos
              setTimeout(() => {
                setCorreoEnviado(false);
              }, 5 * 60 * 1000); // 5 minutos en milisegundos

              AlertError(
                "¡FELICIDADES!",
                "Se ha enviado tu petición.",
                "success",
                "btn btn-success"
              );
            }
          },
          (error) => {
            AlertError("¡Error!", error.text, "error", "btn btn-danger");
          }
        );
    }
  };

  const font = {
    fontSize: 20,
  };

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
