/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../model/Postagem';
import Tema from '../../../model/Tema';
import { buscar, atualizar, cadastrar } from '../../../services/Service';
import { toastAlerta } from '../../../util/toastAlerta';

function FormularioPostagem() {

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    // Obtém o contexto de autenticação e extrai o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Estado para armazenar a lista de temas
    const [temas, setTemas] = useState<Tema[]>([]);

    // Estado para armazenar o tema selecionado
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: '',
    });

    // Estado para armazenar a postagem
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null,
        usuario: null,
    });

    // Função assíncrona para buscar uma postagem pelo ID
    async function buscarPostagemPorId(id: string) {
        await buscar(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        });
    }

    // Função assíncrona para buscar um tema pelo ID
    async function buscarTemaPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
    }

    // Função assíncrona para buscar todos os temas
    async function buscarTemas() {
        await buscar('/temas', setTemas, {
            headers: {
                Authorization: token,
            },
        });
    }

    // useEffect para verificar se o usuário está logado
    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token]);

    // useEffect para buscar temas e a postagem (se houver um ID)
    useEffect(() => {
        buscarTemas();
        if (id !== undefined) {
            buscarPostagemPorId(id);
        }
    }, [id]);

    // useEffect para atualizar o estado da postagem com o tema selecionado
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        });
    }, [tema]);

    // Função para atualizar o estado da postagem com base na entrada do usuário
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    // Função para navegar de volta para a lista de postagens
    function retornar() {
        navigate('/postagens');
    }

    // Função assíncrona para criar ou atualizar uma postagem
    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                toastAlerta('Postagem atualizada com sucesso', 'sucesso');
                retornar();
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info')
                    handleLogout();
                } else {
                    toastAlerta('Erro ao atualizar a Postagem', 'erro');
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                toastAlerta('Postagem cadastrada com sucesso', 'sucesso');
                retornar();
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info')
                    handleLogout();
                } else {
                    toastAlerta('Erro ao cadastrar a Postagem', 'erro');
                }
            }
        }
    }

    // Verifica se o tema está carregando
    const carregandoTema = tema.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

            <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Titulo da postagem</label>
                    <input
                        value={postagem.titulo}
                        onChange={atualizarEstado}
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto da postagem</label>
                    <input
                        value={postagem.texto}
                        onChange={atualizarEstado}
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Tema da postagem</p>
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
                        <option value="" selected disabled>Selecione um tema</option>
                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id}>{tema.descricao}</option>
                        ))}
                    </select>
                </div>
                <button disabled={carregandoTema} type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2'>
                    {carregandoTema ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}

export default FormularioPostagem;
