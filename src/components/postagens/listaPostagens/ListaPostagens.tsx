/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../model/Postagem';
import { buscar } from '../../../services/Service';
import CardPostagem from '../cardPostagem/CardPostagem';
import { Dna } from 'react-loader-spinner';
import { toastAlerta } from '../../../util/toastAlerta';

function ListaPostagens() {

    // Declara um estado para armazenar a lista de postagens
    const [postagens, setPostagens] = useState<Postagem[]>([]);

    // Declara a função de navegação
    const navigate = useNavigate();

    // Obtém o contexto de autenticação e extrai o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // useEffect para verificar se o usuário está logado
    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token, navigate]);

    // Função assíncrona para buscar as postagens
    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error: any) {
            // Se o token estiver expirado, exibe uma mensagem de alerta e desloga o usuário
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout();
            }
        }
    }

    // useEffect para buscar as postagens sempre que o número de postagens mudar
    useEffect(() => {
        buscarPostagens();
    }, [postagens.length]);

    return (
        <>
            {/* Exibe um loader enquanto as postagens estão sendo carregadas */}
            {postagens.length === 0 && (
                <Dna
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {postagens.map((postagem) => (
                    <CardPostagem key={postagem.id} post={postagem} />
                ))}
            </div>
        </>
    );
}

export default ListaPostagens;
