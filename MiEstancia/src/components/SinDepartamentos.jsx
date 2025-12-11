import './Styles/SinDepartamentos.css'
import video from '../video/videosvg.mp4'
import img from '../img/añadirDepartamento.png'
function SinDepartamentos({paginaPublica = true}){
    console.log("paginaPublica", paginaPublica)
    return(
        <div className="SinDepartamentos__container">
            {
                paginaPublica ?
                    <div className='SinDepartamentos__div'>
                        <h2>Parece que no hay departamentos disponibles</h2>
                        <video src={video} autoPlay loop playsInline muted/>
                    </div>
                    :
                    <div className='SinDepartamentos__div'>
                        <h2>Agrega nuevos departamentos para verlos aqui</h2>
                        <img className='SinDepartamentos__img' src={img} />
                    </div>

            }
        </div>
    );
};

export default SinDepartamentos