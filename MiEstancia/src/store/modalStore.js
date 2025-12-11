import { create } from 'zustand'

const useModalStore = create((set)=>({
    modal: false,
    contenido: {
        titulo: "¿Quieres continuar?",
        texto: "La acción no se puede deshacer.",
        boton1: "Cancelar",
        boton2: "Confirmar"
    },
    funcion: (funcion)=>{funcion()},
    setFuncion: (newFunction)=>set({funcion: newFunction}), //evitar la ejecución automatica, evitar usar "newFunction()"
    abrirModal: (informacion = {})=>set({modal:true, contenido:{titulo: informacion.titulo, texto: informacion.texto, boton1: informacion.boton1, boton2: informacion.boton2}}),
    cerrarModal: ()=> set({modal:false}), 
}));

export default useModalStore;