/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext'
import Tema from '../../../model/Tema'
import { buscar, deletar } from '../../../services/Service'

function DeletarTema() {
    // Declara um estado para armazenar os dados do tema
    const [tema, setTema] = useState<Tema>({} as Tema)

    let navigate = useNavigate()

    // Extrai o parâmetro de ID da URL
    const { id } = useParams<{ id: string }>()

    // Obtém o contexto de autenticação
    const { usuario, handleLogout } = useContext(AuthContext)
    // Extrai o token do usuário autenticado
    const token = usuario.token

    // Função assíncrona para buscar um tema pelo ID
    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            // Se o token estiver expirado, exibe uma mensagem de alerta e desloga o usuário
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente')
                handleLogout()
            }
        }
    }

    // useEffect para verificar se o usuário está logado
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/login')
        }
    }, [token, navigate])

    // useEffect para buscar o tema se um ID estiver presente
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    // Função para retornar à página de temas
    function retornar() {
        navigate("/temas")
    }

    // Função assíncrona para deletar um tema
    async function deletarTema() {
        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Tema apagado com sucesso')
        } catch (error) {
            alert('Erro ao apagar o Tema')
        }

        retornar()
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar o tema a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                {/* Cabeçalho do card com estilo */}
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Tema</header>
                {/* Descrição do tema */}
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
                {/* Botões para confirmar ou cancelar a exclusão */}
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={deletarTema}>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema
