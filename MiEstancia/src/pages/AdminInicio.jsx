// Css
import './Styles/AdminInicio.css'
// Importación de componentes
import TarjetaDepartamento from '../components/TarjetaDepartamento.jsx';
import SinDepartamentos from '../components/SinDepartamentos.jsx';
// Importaciones de react
import { useState } from 'react';

// Importación de funciones
import { useSpinnerFetch } from '../utils/useFetchDepartamentos.js';
import  useDepartamentosStore  from '../store/departamentosStore.js'
import { supabase } from '../utils/supabaseClient.js';

// Importación de estados globales
import useUserAuth from '../store/userAuth.js';



function AdminInicio(  ){
    const { uid } = useUserAuth();
    const { addDepartamentos } = useDepartamentosStore();
    const [ departamentos, setDepartamentos ] = useState([]);
    
     useSpinnerFetch(
      () => supabase.from("departamentos").select("*").eq("usuario_id", uid).order("numero", { ascending: true }),
      (data) => {
        setDepartamentos(data);
        addDepartamentos(data);
      }
    );
    return(
        <div className='adminInicio__content'>
            {
                departamentos.length !== 0 ?
                departamentos.map((d)=>(
                    <TarjetaDepartamento key={d.id} {...d} setDepartamentos={setDepartamentos} departamentos ={departamentos}/>
                ))
                : <SinDepartamentos paginaPublica={false} />
            }
        </div>
    );
};

export default AdminInicio;