import React, { useState, useRef, useEffect } from "react";
import "./Form.css";
// import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Spinner } from "react-bootstrap";

const Alert = (title, text, icon, button) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    customClass: {
      confirmButton: button,
      cancelButton: button,
    },
    confirmButtonText: "OK",
    cancelButtonText: "OK",
    buttonsStyling: false,
  });
};

function Form() {
  const [formMusic, setFormMusic] = useState({
    name: "",
    nameMusic: "",
    singer: "",
  });
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [temporizadorActivo, setTemporizadorActivo] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const ultimaMarcaDeTiempo = localStorage.getItem("ultimoEnvio");

    if (ultimaMarcaDeTiempo) {
      const tiempoTranscurrido =
        new Date().getTime() - parseInt(ultimaMarcaDeTiempo);
      const minutosTranscurridos = tiempoTranscurrido / (1000 * 60);

      if (minutosTranscurridos < 5) {
        setCorreoEnviado(true);
        setTemporizadorActivo(true);

        Alert(
          "¡ESPERA!",
          "Debes esperar 5 minutos para solicitar otra canción.",
          "warning",
          "btn btn-danger"
        );

        // Configurar el temporizador para resetear el estado después de 5 minutos
        setTimeout(() => {
          setTemporizadorActivo(false);
          setCorreoEnviado(false);
        }, 5 * 60 * 1000); // 5 minutos en milisegundos
      } else {
        setCorreoEnviado(false);
      }
    } else {
      setCorreoEnviado(false);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormMusic({
      ...formMusic,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    if (correoEnviado || temporizadorActivo) {
      Alert(
        "¡ESPERA!",
        "Debes esperar 5 minutos para solicitar otra canción.",
        "warning",
        "btn btn-danger"
      );
    } else 
    if (
      formMusic.nameMusic === "" ||
      formMusic.nameMusic.length < 3 ||
      formMusic.singer === "" ||
      formMusic.singer.length < 3 ||
      formMusic.name === "" ||
      formMusic.name.length < 3
    ) {
      Alert(
        "¡Error!",
        "Todos los campos deben tener al menos 3 caracteres",
        "error",
        "btn btn-danger"
      );
    } else {
      let send = {
        method: "POST",
        body: JSON.stringify(formMusic),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
      setSpinner(true);
      // Make API call to Submit form data
      // emailjs
      //   .sendForm(
      //     process.env.REACT_APP_SERVICES_ID,
      //     process.env.REACT_APP_TEMPLATE_ID,
      //     formRef.current,
      //     process.env.REACT_APP_PUBLIC_KEY
      //   )
      await fetch(
        process.env.REACT_APP_URLBASE + process.env.REACT_APP_URLSENDEMAIL,
        send
      )
        .then(
          (result) => {
            if (result.status === 200) {
              setSpinner(false);
              // Mensaje de exito para el usuario
              Alert(
                "¡FELICIDADES!",
                "Se ha enviado tu petición.",
                "success",
                "btn btn-success"
              );
              // Reset Form State
              setFormMusic({
                name: "",
                nameMusic: "",
                singer: "",
              });

              /// Actualizar el estado indicando que el correo ha sido enviado y guardar la marca de tiempo
              setCorreoEnviado(true);
              setTemporizadorActivo(true);
              localStorage.setItem(
                "ultimoEnvio",
                new Date().getTime().toString()
              );

              // Configurar el temporizador para resetear el estado después de 5 minutos
              setTimeout(() => {
                setTemporizadorActivo(false);
                setCorreoEnviado(false);
              }, 5 * 60 * 1000); // 5 minutos en milisegundos
            }
          },
          (error) => {
            setSpinner(false);
            Alert("¡Error!", error.text, "error", "btn btn-danger");
          }
        )
        .catch((error) => {
          setSpinner(false);
          Alert(
            "¡Error!",
            "Hubo un problema al enviar el formulario.",
            "error",
            "btn btn-danger"
          );
        });
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
              disabled={spinner ? true : false}
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
              disabled={spinner ? true : false}
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
              disabled={spinner ? true : false}
            />
          </div>
          <hr />
          <div className="w-100">
            <button type="submit">
              {spinner ? (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Spinner className="mx-1" animation="border" variant="dark"/> Cargando...
                </div>
              ) : 'ENVIAR'}
            </button>
          </div>
        </form>
      <Footer />
    </>
  );
}

export default Form;
