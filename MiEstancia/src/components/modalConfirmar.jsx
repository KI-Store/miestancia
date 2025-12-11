// Importación de css
import './Styles/modalConfirmar.css'
// Importación de estados globales zustand
import useModalStore from '../store/modalStore';

function ModalConfirmar(){
    const { cerrarModal, modal, contenido, funcion } = useModalStore();
    
    return(
        <section className={`modal__background ${modal ? "modalOpen" : "modalClose"}`}>
            <div className='modal__content'>
                {/* <div> */}
                    <h1 className='modal__h1'>{contenido.titulo}</h1>
                    <p className='modal__p'>{contenido.texto}</p>
                {/* </div> */}
                <div className='modal__div__botones'>
                    <button className='modal__botones' onClick={cerrarModal}>{contenido.boton1}</button>
                    <button className='modal__botones' onClick={()=>{funcion(); cerrarModal();}}>{contenido.boton2}</button>
                </div>
            </div>
        </section>
    );
};

export default ModalConfirmar;