/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../model/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { toastAlerta } from '../../../util/toastAlerta';

function FormularioTemas() {
    // Declara um estado para armazenar os dados do tema
    const [tema, setTema] = useState<Tema>({} as Tema);

    let navigate = useNavigate();

    // Extrai o parâmetro de ID da URL
    const { id } = useParams<{ id: string }>();

    // Obtém o contexto de autenticação
    const { usuario, handleLogout } = useContext(AuthContext);
    // Extrai o token do usuário autenticado
    const token = usuario.token;

    // Função assíncrona para buscar um tema pelo ID
    async function buscarPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
    }

    // useEffect para buscar o tema se um ID estiver presente
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id]);

    // Atualiza o estado do tema conforme o usuário digita no input
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        });

        console.log(JSON.stringify(tema));
    }

    // Função para lidar com o envio do formulário
    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (id !== undefined) {
            // Atualiza o tema existente
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                });

                toastAlerta('Tema atualizado com sucesso', 'sucesso')
                retornar();

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info')
                    handleLogout();
                } else {
                    toastAlerta('Erro ao atualizar o Tema', 'erro')
                }
            }
        } else {
            // Cadastra um novo tema
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                });

                toastAlerta('Tema cadastrado com sucesso', 'sucesso')

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info')
                    handleLogout();
                } else {
                    toastAlerta('Erro ao atualizar o Tema', 'erro')
                }
            }
        }

        retornar();
    }

    // Função para retornar à página de temas
    function retornar() {
        navigate("/temas");
    }

    // useEffect para verificar se o usuário está logado
    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastre um novo tema' : 'Editar tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do tema</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
                    type="submit"
                >
                    {id === undefined ? 'Cadastrar' : 'Editar'}
                </button>
            </form>
        </div>
    );
}

export default FormularioTemas;