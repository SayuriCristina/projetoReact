import FormularioPostagem from '../formularioPostagem/FormularioPostagem';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import './ModalPostagem.css'

// Define o componente ModalPostagem, que é um pop-up que é ativado com o botão "Nova postagem"
function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={<button className='border rounded px-4 hover:bg-white hover:text-indigo-800'>Nova postagem</button>} modal>
                <div>
                    <FormularioPostagem />
                </div>
            </Popup>
        </>
    );
}

export default ModalPostagem;