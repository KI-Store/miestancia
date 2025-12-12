// Css
import './Styles/PublicPage.css'
// Importación de componentes
import TarjetaDepartamento from "../components/TarjetaDepartamento.jsx";
import IconWhatsapp from '../components/IconWhatsapp.jsx';
// Importar fetchDepartamentos
import { useSpinnerFetch } from "../utils/useFetchDepartamentos.js";
import { supabase } from '../utils/supabaseClient.js' 
import useDepartamentosStore from '../store/departamentosStore';
// IMGS
import logo from '../img/LogoMiEstancia.png'
// Importaciones de react
import { useState } from "react"; 
import { Link } from 'react-router-dom';


// Importaciones de componentes
import SpinerCarga from "../components/spinerCarga.jsx";
import SinDepartamentos from "../components/SinDepartamentos.jsx";
function PublicPage(){
    const [ departamentos, setDepartamentos ] = useState([]);
    const { addDepartamentos } = useDepartamentosStore();

    useSpinnerFetch(
  () => supabase.from("departamentos").select("*").order("numero", { ascending: true }),
  (data) => {
    setDepartamentos(data);
    addDepartamentos(data);
  }
);
    const elementos = departamentos.length;
    const departamentosDisponibles = departamentos.filter(d=> d.disponible === true)

    return(
        <div className="PublicPage__container">
            <SpinerCarga visible={true}/>
            <IconWhatsapp />
            <header className="PublicPage__header">
                <div className='PublicPage__content__logo'>
                    <img className='PublicPage__logo' src={logo} alt="Logo de Mi Estancia" />
                    <h1 className='PublicPage__title'>Mi Estancia</h1>
                    <Link to="/login">Login</Link>
                </div>
            </header>
            <main className="PublicPage__main">
                {   elementos !== 0 && departamentosDisponibles.length > 0 
                     ? departamentos.map(d=>( d.disponible && <TarjetaDepartamento key={d.id} {...d} modoPublico={true}/> ))
                     : <SinDepartamentos />
                }
            </main>
        </div>
    );
};

export default PublicPage;