// Importa funções e componentes necessários do React e de outras bibliotecas
import { useContext, useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../model/Tema';
import { buscar } from '../../../services/Service';
import CardTemas from '../cardTemas/CardTemas';
import { toastAlerta } from '../../../util/toastAlerta';

function ListaTemas() {
    // Declara um estado para armazenar os temas, é um array porque é uma coleção de temas
    const [temas, setTemas] = useState<Tema[]>([]);

    // eslint-disable-next-line prefer-const
    let navigate = useNavigate();

    // Obtém o contexto de autenticação
    const { usuario, handleLogout } = useContext(AuthContext);
    // Extrai o token do usuário autenticado
    const token = usuario.token;

    // Função assíncrona para buscar temas
    async function buscarTemas() {
        try {
            // Faz a requisição para buscar os temas, passando o token no cabeçalho
            await buscar('/temas', setTemas, {
                headers: { Authorization: token },
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/login');
        }
    }, [token, navigate]);

    // useEffect para buscar temas quando a lista de temas estiver vazia
    useEffect(() => {
        buscarTemas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [temas.length]);

    return (
        <>
            {/* Mostra um simbolozinho de carregamento enquanto a lista de temas está vazia */}
            {temas.length === 0 && (
                <Dna
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            {/* Mostra os temas */}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temas.map((tema) => (
                            <CardTemas key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaTemas;
