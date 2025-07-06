import React, { useState } from 'react';
import './App.css'; 
import { toast } from 'sonner';



// Componente
function ComponentLogin() {

  // Estados para los campos del Formulario
  const [Nombre, setNombre] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [AceptaTerminos, setAceptaTerminos] = useState(false);
  const [Errores, setErrores] = useState({}); // Almacenará los errores de validación
  const [MensajeExito, setMensajeExito] = useState(''); 


  // Estado para la visibilidad de la contraseña
  const [ContraseñaVisible, setContraseñaVisible] = useState(false)


  const toggleContraseñavisible = () => {

    setContraseñaVisible(EstadoActual => !EstadoActual)
  }


  // Controlando el envío del Formulario
  const handleSubmit = (evento) => {

     // Evitando que la página se recargue por defecto
    evento.preventDefault();


    // Almacenando errores de validación
    const nuevosErrores = {}; 

    // Validaciones básicas del lado del cliente
    if (!Nombre.trim()) {
      nuevosErrores.Nombre = true;
    }
    if (!Direccion.trim()) {
      nuevosErrores.Direccion = true;
    }
    if (!Correo.trim()) {
      nuevosErrores.Correo = true;
    } else if (!/\S+@\S+\.\S+/.test(Correo)) { // Validando el formato del correo 
      nuevosErrores.Correo = true;
    }
    if (!Contraseña) {
      nuevosErrores.Contraseña = true;
    } else if (Contraseña.length < 6) {
      nuevosErrores.Contraseña = true;
    }

    if (!AceptaTerminos) {
      nuevosErrores.AceptaTerminos = true;
    }

    setErrores(nuevosErrores); // Actualiza los errores en el estado

    // Si no existen errores, se procede a enviar el formulario
    if (Object.keys(nuevosErrores).length === 0) {
      setMensajeExito('¡Formulario enviado con éxito!'); 
      console.log('Datos a enviar:', { Nombre, Direccion, Correo, Contraseña, AceptaTerminos });
      

      fetch('http://localhost/MarketMallorca/APIS/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: Nombre,
          direccion: Direccion,
          correo: Correo,
          contrasena: Contraseña,
          aceptaTerminos: AceptaTerminos,
        }),
      })

      // Haciendo solicitud al servidor PHP
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.success('¡Registro exitoso! Cuenta creada.');
          setErrores({}); // Limpiando Errores
          
        } else {
          toast.error(data.message || 'Error en el registro.' );

        }
      }) // Controlando posibles errores de la petición
      .catch(error => {
        console.error('Error al enviar el formulario:', error);
        toast.error('Hubo un error de conexión. Inténtalo de nuevo.');

      });
      

      // Limpiando los campos después de un envío exitoso
      setNombre('');
      setDireccion('');
      setCorreo('');
      setContraseña('');
      setAceptaTerminos(false);

    } else {
      setMensajeExito(''); // Eliminando mensaje de éxito si existen errores
      toast.error('Corriga los Errores del Formulario')

    }
  };


  return (

    <div>

      <main className="Encapsulated-Main">

        <div className="Encapsulated-left"> 

          <h2> ¡Bienvenido a! </h2>

          <img className='Img-Icon-Market' src="ComponentLoginBuild\Images/Lime.png" alt="Icono del Supermercado" />

          <p> Market Mallorca </p>

          <p> Descubre el vibrante corazón de Mallorca en un solo lugar. Aquí, la frescura de nuestros productos se une con la autenticidad de la página wed para ofrecerte una experiencia de compra única y local. </p>

          <p> Del corazón de Mallorca, a tu mesa. </p>

        </div>
      
    
        <form onSubmit={handleSubmit}>

          <h1> Crea tu Cuenta </h1>

          <label htmlFor="nombre"> Nombre: </label>
          <input
            type="text"
            id="nombre"
            value={Nombre}
            onChange={(evento) => setNombre(evento.target.value)} // Actualizando la Primera Variable con lo Ingresado
            className={Errores.Nombre ? 'Input-Error' : ''}
          />

          <label htmlFor="direccion"> Dirección: </label>
          <input
            type="text"
            id="direccion"
            value={Direccion}
            onChange={(evento) => setDireccion(evento.target.value)}
            className={Errores.Direccion ? 'Input-Error' : ''}
          />

          <label htmlFor="correo"> Correo Electrónico: </label>
          <input
            type="email"
            id="correo"
            value={Correo}
            onChange={(evento) => setCorreo(evento.target.value)}
            className={Errores.Correo ? 'Input-Error' : ''}
          />

          <label htmlFor="contraseña"> Contraseña: </label>
          <input
            type={ContraseñaVisible ? 'text' : 'password'}
            id="contraseña"
            value={Contraseña}
            onChange={(evento) => setContraseña(evento.target.value)} 
            className={Errores.Contraseña ? 'Input-Error' : ''}
          />
        
          <button type='button' className='Visible-Password-Button' onClick={toggleContraseñavisible}>
            <img className='Img-Password' src= {ContraseñaVisible ? "/Images/PasswordOpen.png" : "/Images/PasswordClose.png"} />
          </button>

          <button className='Recover-Password-Button'> 
            <a href="" className='Recover-Password-Link'>  ¿Olvidaste tu Contraseña? </a>
          </button>
           
          <div className='Buttons-Login'>
            <button type="submit"> Crear Cuenta </button>
            <button> Iniciar Sesión </button>
          </div>

          <input 
            type="checkbox"
            id="aceptaTerminos"
            checked={AceptaTerminos}
            onChange={(evento) => setAceptaTerminos(evento.target.checked)}/>
          <label className='Label-Terms' htmlFor="aceptaTerminos"> He leído y acepto los <a href="http://localhost/MarketMallorca/LegalTerms/Terms.html " target="_blank"> Términos y Condiciones </a> </label>
            
        </form>
          
      </main>

    </div>
  );
}

// Exportando el Componente
export default ComponentLogin;