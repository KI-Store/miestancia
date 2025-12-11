// Css
import './Styles/TarjetaDepartamento.css'
// Icons
import { FaBuildingUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";

function TarjetaDepartamento2( { huesped = "", telefono = "", entrada = "" } ){
    return(
        <div className='tarjeta2'>
            <h2 className='tarjeta2__h2'>Detalles</h2>
            <span className='tarjeta__span'><FaBuildingUser className='tarjeta__icons'/> <p className='tarjeta__p'> <strong className='tarjeta__strong'>Huesped: </strong>{ huesped }</p></span>
            <span className='tarjeta__span'><FaPhoneAlt className='tarjeta__icons'/> <p className='tarjeta__p'> <strong className='tarjeta__strong'>Telefono:</strong> <a target='_blank' href={`https://wa.me/${telefono}`}>{ telefono }</a></p>   </span>
            <span className='tarjeta__span'><FaCalendarCheck className='tarjeta__icons'/> <p className='tarjeta__p'> <strong className='tarjeta__strong'>Entrada: </strong>{ entrada }</p></span>
        </div>
    );
};

export default TarjetaDepartamento2;