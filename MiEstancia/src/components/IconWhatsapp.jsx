// ICONS
import { FaWhatsapp } from "react-icons/fa";

// CSS
import './Styles/IconWhatsapp.css'

function IconWhatsapp(){
    const handleClicIcon = () => {
        // const url = "https://wa.me/+525561369256/text=Hola%21%20me%20interesa%20rentar%20un%20departamento";
        const url = "https://www.youtube.com/watch?v=UeAWbDEMj7E"
        window.open(url, "_blank");
        return;
    }
    return(
        <span onClick={handleClicIcon} className="IconWhatsapp__content">
            <FaWhatsapp className="IconWhatsapp__icon"/>
        </span>
    );
};

export default IconWhatsapp;