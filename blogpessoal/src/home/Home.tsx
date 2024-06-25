import { useEffect, useState } from 'react'
import React from 'react'
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

            <h1 className='text-3xl font-bold underline text-violet-900'>{props.titulo}</h1>
            <img className='foto' src='https://c8.alamy.com/comp/DR9PKD/black-guy-showing-thumbs-up-all-on-white-background-DR9PKD.jpg'></img>
            <p>{props.texto}</p>

            <h2>{contador}</h2>
            <button onClick={somar} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Clique aqui</button>

        </div>
    )
}

export default Home