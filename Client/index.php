<!DOCTYPE html>
<html lang="es"> 

<head> 

    <title> Inicio | Market Mallorca </title>

    <meta charset="UTF-8"> 

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--Descripción página-->
    <meta name="description" content="Bienvenido a Market Mallorca. Conoce nuestra misión y visión, descubre nuestro catálogo de productos, realiza pedidos y contáctanos para tus compras en Ibagué."> 

    <!--CSS-->
    <link rel="icon" href="./Images/IconLime.webp"> 

    <link rel="stylesheet" href="Fonts/Fonts.css"> 

    <link rel="stylesheet" href="index.css"> 

    <link rel="stylesheet" href="./Header/Header.css"> 

    <link rel="stylesheet" href="./FooterPage/FooterPage.css"> 

    <!--URL canonica-->
    <link rel="canonical" href="https://www.marketmallorca.com/index.php">

    <!--Contenido ULRs-->
    <meta property="og:title" content="Inicio | Market Mallorca"> 

    <meta property="og:description" content="Encuentra los mejores productos y ofertas en Market Mallorca. ¡Tu experiencia de compra ágil y confiable está aquí!"> 

    <meta property="og:url" content="https://www.marketmallorca.com/index.php"> 

    <meta property="og:type" content="website"> 

</head>


<body> 

    <!--Barra de navegación-->
    <?php include './Header/Header.php'; ?>


    <main>

        <p class='Text-Welcome'> Bienvenidos a <strong> Market Mallorca</strong>. En esta nueva página encontrarán todo lo necesario para conocernos y así tener un mayor acercamiento con ustedes, puesto que son la prioridad en el día a día de nuestro trabajo. Aquí podrán ver nuestro catálogo de productos, realizar pedidos, conocer quiénes somos y nuestros objetivos como empresa, así como los diferentes medios para contactarnos y llegar a nosotros. </p>

    </main>


    <!--Pie de página-->
    <?php include './Footer_Page/FooterPage.php' ?>


    <!--Scripts-->
    <script src="./Scripts/Tween-Header.js" defer></script>

    <!--Enlace Gsap-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script> 

    <!--Enlace SplitText-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></Script> 

</body>

</html> 


import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'; 
import React, { useState } from 'react';
import { toast } from 'sonner';
import './Login.css';



function Login() {

  // Función navegación
  const Navigate = useNavigate()
  
  // Estados 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);


  // Puente con el estado global
  const { login } = useAuth();
  

  // Visibilidad contraseña
  const togglePasswordVisible = () => {

    setPasswordVisible(EstadoActual => !EstadoActual);
  } 


  const handleSubmit = async (event) => {

    event.preventDefault(); 

    // Desabilitando el boton de envio
    setIsLoading(true);

    try {
       const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:4000';
       const response = await fetch(`${API_URL}/api/auth/login`, { 

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ 
          email, 
          password 
        }),
      });


      const data = await response.json();

      if (response.ok && data.message) {

        toast.success(data.message)

        setEmail('');
        setPassword('');

        // Guardando el token / Actualizando el estado global
        login(data.token, data.user); 
      
        
        // Redireccionando
        setTimeout(() => {
          Navigate('/profile')
        }, 1500)

      } else if (!response.ok) {
        
        toast.error(data.message || 'Error en el inicio de sesión. Inténtalo de nuevo.');
      }  

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      toast.error('Hubo un error de conexión. Inténtalo de nuevo.');

    } finally {
      setIsLoading(false);
    }
  };


  return (

    <div>

      <main className="Section-Main-Login">

        <form onSubmit={handleSubmit}>

          <h1 className='Subtitle-Login'> Inicia Sesión </h1>

          <label htmlFor="email"> Correo: </label> 
          <input 
          type="email"
          id='email'
          name='email'
          value={email}
          required
          onChange={(evento) => setEmail(evento.target.value)}
          />


          <label htmlFor="password"> Contraseña: </label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name='password'
            value={password}
            required
            minLength={6}
            onChange={(evento) => setPassword(evento.target.value)} 
          />

          <button type='button' className='Visible-Password-Button' onClick={togglePasswordVisible}>
            <img className='Icon-Password-Login' src={ `${import.meta.env.BASE_URL}Images/${passwordVisible ? "PasswordOpen.webp" : "PasswordClose.webp"}`} alt={passwordVisible ? "Ojo abierto, ocultar contraseña" : "Ojo cerrado, mostrar contraseña"}  />
          </button>


          <Link to='/Password/ForgotPassword.jsx' className='Recover-Password-Link'> ¿Olvidaste tu Contraseña? </Link>
        
          
          <div className='Encapsulated-Button'>
            <button type='submit' className='Button-Login'disabled={isLoading}> {isLoading ? 'Conectando...' : 'Iniciar Sesión'} </button>
          </div>

          <p className='Link-CreateAccount'>¿No tienes una cuenta? <Link to='/register'> Crea una </Link> </p>
   
        </form>


        <section className="Section-Welcome"> 

          <h2 className='Title-Login'> ¡Bienvenido de vuelta! </h2>

          <img className='Icon-Market-Login' src={`${import.meta.env.BASE_URL}Images/Lime.webp`} alt="Icono del Supermercado Market Mallorca" />

          <h3> Market Mallorca </h3>

          <p className='Paragraph-Login'> Inicia sesión y vuelve a tu mercado, ese que creamos juntos. Tu lista de favoritos, los sabores auténticos y la frescura de nuestra isla te esperan para seguir llenando tu mesa de lo mejor. 
          </p>

          <p className='Phrase-Login'> El corazón de Mallorca te extraña </p> 

        </section>
      
      </main>

    </div>
  );
}

export default Login;



import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// 1. Importar el Proveedor de Autenticación
import { AuthProvider } from './context/AuthContext.jsx';
// 2. Importar el Hook personalizado (si lo necesitas fuera de las rutas)
import { useAuth } from './context/AuthContext.jsx'; 

// Importando componentes
import CreateAccount from './CreateAccount/CreateAccount.jsx';
import Login from './Login/Login.jsx';
import Profile from './UserProfile/Profile.jsx';


// Componente auxiliar para proteger las rutas
const ProtectedRoute = ({ element: Component }) => {
    // Leemos el estado global
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        // Muestra un loader mientras verifica el token
        return <div className="p-8 text-center">Verificando sesión...</div>;
    }

    if (!isAuthenticated) {
        // Si no está autenticado, redirige al login
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado, muestra el componente solicitado
    return Component;
};


export function App() {

    // Hemos eliminado todo el estado local (isLoggedIn, useEffect, handleLogin/Logout)

    return (
        // 3. ¡CRUCIAL! Envolvemos el sistema de rutas con el AuthProvider
        <AuthProvider> 
            <Routes>
                {/* 1. RUTA RAÍZ */}
                <Route path="/" element={<Navigate to="/register" replace />} />
                
                {/* 2. RUTA DE REGISTRO */}
                <Route path="/register" element={<CreateAccount />} />
                
                {/* 3. RUTA DE LOGIN */}
                <Route path="/login" element={<Login />} />

                {/* 4. RUTA PROTEGIDA (SOLO CON SESIÓN ACTIVA) */}
                <Route 
                    path='/profile' 
                    element={<ProtectedRoute element={<Profile />} />} 
                />

            </Routes>
            
            <Toaster position="top-right" richColors /> 
        </AuthProvider>
    );
}