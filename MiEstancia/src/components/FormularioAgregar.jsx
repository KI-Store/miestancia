// Css
import './Styles/FormularioAgregar.css'
// Importaciones de React
import { useState, useEffect } from 'react';
// Importación de supabase
import { supabase } from '../utils/supabaseClient';
// Importacion de estado global
import { useFormStore } from '../store/FormStore';
import useUserAuth from '../store/userAuth';
// Importacion de react-router-dom
import { useNavigate } from 'react-router-dom'

// Importación de funciones
import { limpiarDepartamento } from '../utils/funciones';
import { normalizeExtras } from '../utils/funciones';

const FormularioDepartamento = () => {
  const {uid} = useUserAuth();
  const navigate = useNavigate(); 
  const {editingData, clearEditingData} = useFormStore();
  const [enEdicion, setEnEdicion] = useState(false);

  const [formulario, setFormulario] = useState({
    numero: "0",
    personas: 2,
    baños: 1,
    extras: "",
    tamaño: 'Chico',
    precio: 2000,
    disponible: true,
    huesped: '',
    telefono: '',
    entrada: '',
    imagenes: [],
  });

  useEffect(()=>{
    if(editingData){
      setEnEdicion(true);
      const datosLimpiados = limpiarDepartamento(editingData);
      setFormulario(datosLimpiados);
    }else{
      setEnEdicion(false);
    }
  }, [editingData])


 


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "extras") {
        const extrasArray = value.split(",").map(e => e.trim()).filter(e => e !== "");
        setFormulario({ ...formulario, [name]: extrasArray });
    }
    if (type === 'checkbox') {
      setFormulario({ ...formulario, [name]: checked });
    } else if (type === 'file') {
      const nuevasImagenes = Array.from(files);
      const todas = [...formulario.imagenes, ...nuevasImagenes];

      // eliminar duplicados por nombre o por URL
      const imagenesUnicas = todas.filter((item, index, arr) => {
      if (typeof item === "string") return arr.indexOf(item) === index;
      return arr.findIndex(other =>
      typeof other !== "string" && other.name === item.name
      ) === index;
      });

setFormulario({ ...formulario, imagenes: imagenesUnicas }); 
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (editingData) {
        const urls = [];
        console.log("Imagenes de formulario: ", formulario.imagenes);
      for (const file of formulario.imagenes) {
        console.log("File: ", file)
      // Si el archivo ya es una URL (imagen ya subida), se conserva
        if (typeof file === "string" && file.startsWith("https://")) {
          urls.push(file);
          console.log("Imagenes anteriores guardadas: ", urls);
        } else {
          const fileName = `${formulario.numero}-${Date.now()}-${file.name}`;
          const { error: uploadError } = await supabase.storage
        .from("departamentos")
        .upload(fileName, file);

        if (uploadError) {
          console.error("Error al subir imagen: ", uploadError.message);
          return;
        }

        const { data } =  supabase.storage
        .from("departamentos")
        .getPublicUrl(fileName);
        urls.push(data.publicUrl);
      }
  }

  const datosEditados = {
      numero: formulario.numero,
      personas: parseInt(formulario.personas),
      baños: parseInt(formulario.baños),
      extras: normalizeExtras(formulario.extras),
      tamaño: formulario.tamaño,
      precio: parseInt(formulario.precio),
      disponible: formulario.disponible,
      huesped: formulario.huesped || null,
      telefono: formulario.telefono || null,
      entrada: formulario.entrada || null,
      imagenes: urls ?? []
    }
  const idRecibido = parseInt(editingData.id)
  
  const { _data, error } = await supabase
    .from("departamentos")
    // .update({...datosEditados})
    .update({...datosEditados})
    .eq("id", idRecibido)
    .select();

    // error: updateError
  if (error) {
    console.error("Error al actualizar en la base de datos: ", error.message);
  } else {
    alert("Departamento editado con éxito 📝");
  }
}else{
        const urls = [];

        for (const file of formulario.imagenes){
            const fileName = `${formulario.numero}-${Date.now()}-${file.name}`;
            const {error: uploadError} = await supabase.storage
            .from("departamentos")
            .upload(fileName, file);

            if(uploadError){
                console.error("Error al subir imagen: ", uploadError.message);
                return;
            }
            
            const { data } = supabase.storage.from("departamentos").getPublicUrl(fileName);
            urls.push(data.publicUrl);
            // Propiedades que devuelve publicUrl  {
            //   data: {
            //     publicUrl: "https://xyz.supabase.co/storage/v1/object/public/departamentos/archivo.jpg"
            //   },
            //   error: null
            //  }
    }
    
        // Guardar información del formulario en la base de datos
        const { error: insertError } = await supabase
        .from("departamentos")
        .insert([
            {
                numero: formulario.numero,
                personas: parseInt(formulario.personas),
                baños: parseInt(formulario.baños),
                extras: normalizeExtras(formulario.extras),
                tamaño: formulario.tamaño,
                precio: parseInt(formulario.precio),
                disponible: formulario.disponible,
                huesped: formulario.huesped || null,
                telefono: formulario.telefono || null,
                entrada: formulario.entrada || null,
                imagenes: urls,
                usuario_id: uid,
            }
        ]);
    if(insertError){
        console.error("Error al insertar en la base de datos: ", insertError.message);
    }else{
        alert("Departamento agregado con éxito 🎉");
        setFormulario({
            numero: "0",
            personas: 2,
            baños: 1,
            extras: "",
            tamaño: "Chico",
            precio: 2000,
            disponible: true,
            huesped: '',
            telefono: '',
            entrada: '',
            imagenes: [],
        })
    }
      }
      // Limpieza de datos
      clearEditingData();
      navigate('/admin');
    }catch(error){
        console.error("Error inesperado:", error)
    }
  };
  return (
    <section className='FormularioAgregar__content'>
      <form className='FormularioAgregar__form' onSubmit={handleSubmit}>
        <h2 className='FormularioAgregar__h2'>{editingData ? "Editar departamento" :  "Agregar departamento"}</h2>

    
        <span className='FormularioAgregar__span'>
          <label>Número:</label>
          <input className='FormularioAgregar__input' name="numero" value={formulario.numero} onChange={handleChange} required />  
        </span>

        <div className='Linea__div'></div> {/*Linea para dividir*/}

        <span className='FormularioAgregar__span'>
          <label>Personas recomendadas:</label>
          <input className='FormularioAgregar__input' type="number" name="personas" value={formulario.personas} onChange={handleChange} required />
        </span>

        <div className='Linea__div'></div> {/*Linea para dividir*/}

        <span className='FormularioAgregar__span'>
          <label>Baños</label>
          <input className='FormularioAgregar__input' type="number" name='baños' value={formulario.baños} onChange={handleChange} required/>
        </span>

        <div className='Linea__div'></div> {/*Linea para dividir*/}

        <span className='FormularioAgregar__span'>
          <label>Extras: {"Separalos usando una coma ','"}</label>
          <input className='FormularioAgregar__input' placeholder='Ej. Baño completo' type="text" name='extras' value={formulario.extras ? formulario.extras : ""} onChange={handleChange} />
        </span>

        <div className='Linea__div'></div> {/*Linea para dividir*/}

        <span className='FormularioAgregar__span'>
          <label>Tamaño:</label>
          <select className='FormularioAgregar__select' name="tamaño" value={formulario.tamaño} onChange={handleChange} required>
             <option value="Pequeño">Pequeño</option>
             <option value="Mediano">Mediano</option>
             <option value="Grande">Grande</option>
          </select>
        </span>

        <div className='Linea__div'></div> {/*Linea para dividir*/}

        <span className='FormularioAgregar__span'>
          <label>Precio por mes:</label>
          <input className='FormularioAgregar__input' type="number" name="precio" value={formulario.precio} onChange={handleChange} required />
        </span>

        <div className='Linea__div'></div> {/*Linea para dividir*/}

        <span className='FormularioAgregar__span'>
          <label>¿Está disponible? </label>
          <input className='FormularioAgregar__input'  type="checkbox" name="disponible" checked={formulario.disponible} onChange={handleChange} />
          <p>{formulario.disponible ? "Si" : "No"}</p>
        </span>

        <div className='Linea__div'></div> {/*Linea para dividir*/}

        {
          !formulario.disponible && 
          <div className='FormularioAgregar__div__disponible'>
            <span className='FormularioAgregar__span'>
              <label>Nombre del huésped:</label>
              <input className='FormularioAgregar__input' type="text" name="huesped" value={formulario.huesped} onChange={handleChange} />
            </span>
            <div className='Linea__div'></div> {/*Linea para dividir*/}
            <span className='FormularioAgregar__span'>
              <label>Teléfono:</label>
              <input className='FormularioAgregar__input' type="tel" name="telefono" value={formulario.telefono} onChange={handleChange} />
            </span>
            <div className='Linea__div'></div> {/*Linea para dividir*/}
            <span className='FormularioAgregar__span'>
              <label>Fecha de entrada:</label>
              <input className='FormularioAgregar__input' type="date" name="entrada" value={formulario.entrada} onChange={handleChange} />
            </span>
            <div className='Linea__div'></div> {/*Linea para dividir*/}
          </div>
        }

          <span className='FormularioAgregar__span'>
            <label For="inputFile" className='FormularioAgregar__input labelInputFile'>Subir Imagen</label>
            <input id='inputFile' style={{display:"none"}}  type="file" name="imagenes" accept="image/*" multiple onChange={handleChange} />
          </span>
          <div className='Linea__div'></div> {/*Linea para dividir*/}


        <button className='FormularioAgregar__boton' type="submit">{enEdicion ? "Guardar cambios" : "Guardar departamento"}</button>
        <p className='FormularioAgregar__aviso'>La información no añadida se establecera con un valor predeterminado.</p>
      </form>
    </section>
  );
};

export default FormularioDepartamento;