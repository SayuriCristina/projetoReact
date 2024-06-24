import { useEffect, useState } from 'react'
import './Home.css'

interface myProps {
    titulo: string,
    texto: string
}

function Home(props: myProps) {

    const [contador, setContador] = useState(0)
    function somar() {
        setContador(contador + 1)
    }

    useEffect(() => {
        alert('useEffect')
    }, [contador > 5])

    return (
        <div>

            <h1 className='titulo'>{props.titulo}</h1>
            <img className='foto' src='https://c8.alamy.com/comp/DR9PKD/black-guy-showing-thumbs-up-all-on-white-background-DR9PKD.jpg'></img>
            <p>{props.texto}</p>

            <h2>{contador}</h2>
            <button onClick={somar}>Clique aqui</button>

        </div>
    )
}

export default Home