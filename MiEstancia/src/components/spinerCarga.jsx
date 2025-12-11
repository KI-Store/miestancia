// Importación de css
import './Styles/spinerCarga.css'
// IMPORTAR IMAGEN
import logo from '../img/LogoMiEstancia.png'
// Importación de estado global
import { useStateSpiner } from '../store/estadoSpiner';

function SpinerCarga(){
    const { visible } = useStateSpiner();
    return(
        <section className={`section__spinerCarga ${visible ? "show__spinerCarga" : ""}`}>
            <div className='SpinerCarga__div'>
                <img className='SpinerCarga__logo' src={logo} alt="Logo de Mi Estancia" />
                <h1 className='SpinerCarga__h1'>
                    Cargando Mi Estancia...
                </h1>
            </div>
        </section>
    );
};


export default SpinerCarga;