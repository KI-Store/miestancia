// CSS
import './Styles/Slider.css'
// Importaciones de react
import { useState } from 'react'
// Importación de iconos
import { IoIosArrowDropleftCircle } from "react-icons/io";

function Slider({imagenes = []}){
    const [index, setIndex] = useState(0);
    const [claseAnimacion, setClaseAnimacion] = useState("animacion")
    const prevSlide = () => {
        setClaseAnimacion("");
        setTimeout(()=>{
            setIndex(prev => prev === 0 ? imagenes.length - 1 : prev - 1 );
            setClaseAnimacion("animacion");
        },500);
    }
    const nextSlide = () => {
        setClaseAnimacion("");
        setTimeout(()=>{
            setIndex(prev => prev === imagenes.length - 1 ? 0 : prev + 1);
            setClaseAnimacion("animacion")
        },500)
    }
    return(
        <div className='Slider__container'>
            <img className={`Slider__img ${claseAnimacion}`} style={{height: "250px", whidth: "250px"}} src={imagenes[index]} />
            {
                imagenes.length > 1  && 
                <div className='Slider__container__icons'> 
                    <IoIosArrowDropleftCircle className='Slider__Icons' onClick={nextSlide}/>
                    <IoIosArrowDropleftCircle className='Slider__Icons' style={{ transform: "rotate(180deg)"}} onClick={prevSlide}/>
                </div>  
            }  
        </div>
        
    );
};

export default Slider;