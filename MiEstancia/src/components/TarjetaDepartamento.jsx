// Css
import './Styles/TarjetaDepartamento.css'
// Importaciones de react
import {useNavigate} from 'react-router-dom'
// Importación estado global de zustand
import useModalStore from '../store/modalStore';
import { useFormStore } from "../store/FormStore";
import useUserAuth from '../store/userAuth';
// Importación de componentes 
import TarjetaDepartamento2 from "./TarjetaDepartamento2";
import Slider from './Slider';
// Importación de supabase
import { supabase } from '../utils/supabaseClient';
// Importación de iconos
import { FaPeopleGroup } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdBathtub } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


function TarjetaDepartamento({ id, numero, tamaño, personas, baños, extras, imagenes, precio, disponible, huesped, telefono, entrada, modoPublico = false, setDepartamentos, departamentos }){
    const { userSession } = useUserAuth();
    const {setEditingData} = useFormStore();
    const { abrirModal, setFuncion } = useModalStore();
    const navigate = useNavigate();

    const handleEditar = ()=>{
        const datos = {
            id,
            numero,
            tamaño, 
            personas,
            baños,
            extras,
            imagenes,
            precio,
            disponible,
            huesped,
            telefono,
            entrada,
        }
        const response = setEditingData(datos);
        if(response){
            navigate("/admin/nuevo");
        }else{
            console.log("Error al completar los datos de edición en el formulario");
        }
    }

    const ActualizarDespuesDeEliminar = (id)=>{
        const Actuales = departamentos.filter(dep => dep.id !== id);
        setDepartamentos(Actuales);
    }


    const deleteDepartamento = async ()=>{
        const { data, error } = await supabase
        .from('departamentos')
        .delete()
        .eq('id', id)
        
        if(!error){
            abrirModal({
                titulo: "Departamento eliminado",
                texto: "El departamento se elimino con éxito",
                boton1: "Cerrar",
                boton2: "Aceptar"
            });
            setFuncion(()=>{ActualizarDespuesDeEliminar(id)})
        }else{
            return console.log("Error al eliminar el departamento.");
        }
         
    }

    
    
    return(
        <div className="tarjeta" style={{border: `solid 2px ${disponible ? "#036d80" : "#360101"}`, borderRadius: "10px"}}>
            <div className='div__tarjeta__status'>
            {
                !modoPublico && <p className={`tarjeta__status ${disponible ? "tarjeta__disponible" : "tarjeta__ocupado"}`}>{disponible ? "Disponible" : "Ocupado"}</p>
            }
            </div>
            <h2 className='tarjeta__numero__dep'>Departamento {numero} ({tamaño})</h2>
            <Slider imagenes={imagenes}/>     
            <span className='tarjeta__span'>
            {
                personas < 2
                 ? <FaUser  className='tarjeta__icons'/> 
                 : personas > 2 
                 ? <FaPeopleGroup  className='tarjeta__icons'/>
                 : <BsFillPeopleFill  className='tarjeta__icons'/>
            } <p className='tarjeta__p'><strong className='tarjeta__strong'>Capacidad:</strong> {personas} personas</p>
            </span>
            <span className='tarjeta__span'>
                <MdBathtub className='tarjeta__icons'/> 
                <p className='tarjeta__p'><strong className='tarjeta__strong'>Baños: </strong> {baños}</p>
            </span>
            { extras.length !== 0 && <section className='tarjeta__section'>
            
                <h3 className='tarjeta__h3'>Caracteristicas: </h3>
            
            <div className='tarjeta__div__ul'><ul className='tarjeta__ul'>
                {
                    extras.map((e, i) => (
                        <li key={i}>✔ {e}</li>
                    )) 
                }
            </ul>
            </div>
            </section>
            }
            <h3 className='tarjeta__h3'>${precio} mxn /mes</h3>

            {
               (!modoPublico && userSession && disponible === false) &&  <TarjetaDepartamento2 huesped={huesped} telefono={telefono} entrada={entrada}/>
            }
            {
                (!modoPublico && userSession) &&  <div className='tarjeta__div__botones'>
                <button className='tarjeta__btn' onClick={handleEditar}> <span className='tarjeta__span'> <MdEdit className='tarjeta__icons'/> <p className='tarjeta__p__btn'> Editar </p></span> </button>
                <button className='tarjeta__btn' onClick={()=> {abrirModal({titulo: "Eliminar Departamento", texto: "Esta acción no se puede deshacer", boton1: "Cancelar", boton2: "Continuar"}); setFuncion(deleteDepartamento)}}><span className='tarjeta__span'> <MdDelete className='tarjeta__icons'/> <p className='tarjeta__p__btn'>Eliminar</p></span></button>
                </div>
            }
        </div>
    )
}

export default TarjetaDepartamento;