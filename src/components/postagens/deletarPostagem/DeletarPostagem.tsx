/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Postagem from '../../../model/Postagem'
import { buscar, deletar } from '../../../services/Service'
import { toastAlerta } from '../../../util/toastAlerta'

function DeletarPostagem() {
    
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    
    const navigate = useNavigate()

    // Recebe o ID e usa como parâmetro
    const { id } = useParams<{ id: string }>()

    // Obtém o contexto de autenticação e extrai o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Função assíncrona para buscar uma postagem pelo ID
    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            // Se o token estiver expirado, exibe uma mensagem de alerta e desloga o usuário
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
            }
        }
    }

    // useEffect para verificar se o usuário está logado
    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token, navigate])

    // useEffect para buscar a postagem se um ID estiver presente
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    // Função para retornar à página de postagens
    function retornar() {
        navigate("/postagens")
    }

    // Função assíncrona para deletar uma postagem
    async function deletarPostagem() {
        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Postagem apagada com sucesso', 'sucesso')
        } catch (error) {
            toastAlerta('Erro ao apagar a Postagem', 'erro')
        }

        retornar() 
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar postagem</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Postagem</header>
                <div className="p-4">
                    <p className='text-xl h-full'>{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={deletarPostagem}>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem
