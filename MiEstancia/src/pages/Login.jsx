// CSS
import './Styles/Login.css'

import { useNavigate } from 'react-router-dom';
import { handleLogin, handleRegister } from "../utils/auth.js";
import { useState } from "react";

// IMG
import logo from '../img/LogoMiEstancia.png';

function Login(){
    const navigate = useNavigate();

    const [formEmty, setFormEmpty] = useState(true); //Estado "formEmpty" indica si el formulario esta vacio para deshabilitar el boton de inicio

    const [message, setMessage] = useState(["", "green"]); // Estado "message" para mostrar mensaje de error o de éxito

    const [formLogin, setFormLogin] = useState({ // Estado "formLogin" para los datos del formulario
        email: "",
        contraseña: "",
    });

    // Desestructuración para evitar nombres muy largos
    const { email, contraseña } = formLogin;  
    

    // Manejador de evento onChange
    const handleChange = (e) => {
        //Desestructuración para evitar nombres muy largos
        const {name, value} = e.target;
        // Añadir la información al estado
        //Se hace una copia ya que la operación es asincrona y puede que no se validen bien los datos actuales.
        const updatedForm = {...formLogin, [name]:value}
        setFormLogin(updatedForm);
        // Validación para evitar campos vacios
        if(updatedForm.email === "" || updatedForm.contraseña === ""){
            // Return para concelar el flujo del código y mandar mensaje "No puedes dejar campos vacios" con el color rojo de error
           return setMessage(["No puedes dejar campos vacios", "red"]);
        }
        // Validación para verificar que el email tenga "@"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedForm.email)) {
            return setMessage(["Ingresa un correo válido", "red"]);
        }
        // Validación de que sean mayores a 3 caracteres
        if(updatedForm.email.length < 3 || updatedForm.contraseña.length < 3){
            // Mensaje de error si se cumple la sentencia
            return setMessage(["Credenciales inválidas", "red"]);
        }
        // Si todo esta bien, se reinicia el mensaje a los valores por defecto ["", "green"]
        setMessage(["", "green"]);
        // Estado "formEmpty" a falso para habilitar el botón del formulario
        setFormEmpty(false);
    }

// Manejador del evento submit
    const handleSubmit = () => {
        // Desestructuración para evitar valores muy largos
        const { email, contraseña } = formLogin;

        // Función "handleLogin" traido de auth.js que maneja el inicio de sesión en supabase, pasando credenciales
        // Y funciones "setMessage", "setLoginOk", "login" y "navigate"
        handleLogin(email, contraseña, setMessage, navigate);
    };

    return(
        <section className='Login__content'>
            <div className='Login__div'>
                <div className='Login__contenedorLogo'><img className='Login__logo' src={logo} alt="Logo de Mi Estancia" /></div>
                <h1 className='Login__title'>Mi Estancia</h1>
                <fieldset className='Login__fieldset'>
                    <legend className='Login__legend'>Login</legend>
                    <label>Correo *</label>
                    <input className='Login__input' name="email" value={email} type="email" onChange={handleChange} />

                    <label>Contraseña *</label>
                    <input className='Login__input' name="contraseña" value={contraseña} type="password" onChange={handleChange} />
                    {/* Botón deshabilitado en caso de que los campos esten vacios */}
                    <button className='Login__button' disabled={formEmty} onClick={()=>{handleSubmit(); }}>Iniciar Sesión</button>
                    {/* Mensaje que solo se mostrará si contine algo */}
                    {message[0] && <p style={{color: `${message[1]}`}}>{message[0]}</p>}
                </fieldset> 
            </div>        
        </section>
    );
};

export default Login;