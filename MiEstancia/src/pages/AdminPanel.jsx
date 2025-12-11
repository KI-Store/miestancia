// Css
import './Styles/AdminPanel.css'
// Importaciones de react-router-dom
import { useNavigate, Link, Routes, Route, useLocation } from "react-router-dom";


// Importaciones de estados globales
import useDepartamentosStore from '../store/departamentosStore.js';
import useUserAuth from "../store/userAuth.js";

// Importación de componentes
import AdminInicio from "./AdminInicio.jsx";
import FormularioDepartamento from "../components/FormularioAgregar.jsx";
import ModalConfirmar from "../components/modalConfirmar.jsx";
import SpinerCarga from "../components/spinerCarga.jsx";

// Importación de funciones
import { handleLogout } from "../utils/auth.js";
// Icons
import { RxExit } from "react-icons/rx";
import { MdAddHomeWork } from "react-icons/md";
import { FaHome } from "react-icons/fa";

function AdminPanel(){
    const {setUserSession} = useUserAuth();
    const { departamentos } = useDepartamentosStore();
    const path = useLocation();
    const navigate = useNavigate();

    return(
        <section>
            <SpinerCarga visible={true}/>
            <ModalConfirmar />
            <header className="AdminPanel__header">
                <div className='AdminPanel__header__div1'>
                    <div className='div1__exit'>
                        <span onClick={() => { handleLogout(setUserSession, navigate) }} className='div__exit__span'><RxExit className='icon__exit exit__hover'/><p className='div__exit__p exit__hover'>Cerrar sesión</p></span>
                    </div>
                    <div className='div1__title'>
                        <h1 className='AdminPanel__header__h1'>Panel de Administración</h1>
                    </div>
                </div>
                <div className="AdminPanel__header__div2">
                    <Link className={`header__link ${path.pathname ===  "/admin" && "link__active"}`} to={'/admin'}><FaHome className={`header__link__icon ${path.pathname === "/admin" && "icon__active"}`}/> Inicio</Link>
                    <Link className={`header__link ${path.pathname ===  "/admin/nuevo" && "link__active"}`} to={'/admin/nuevo'}><MdAddHomeWork className={`header__link__icon ${path.pathname === "/admin/nuevo" && "icon__active"}`}/> Agregar</Link>
                </div>
                
            </header>
            
            <div className='AdminPanel__rutas__div'>
                <Routes>
                    <Route path="" element={<AdminInicio departamentos={departamentos}/>}/>
                    <Route path="nuevo" element={<FormularioDepartamento />} />
                </Routes>
            </div>
        </section>
    );
};

export default AdminPanel;