import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../model/UsuarioLogin"
import { login } from "../services/Service"
import { toastAlerta } from "../util/toastAlerta"

// Interfaces para definir as propriedades do contexto e do provedor.
// Dados do usuario logado; logout; login; carregamento.
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode // Componentes filhos a serem envolvidos pelo provedor
}

// Criação do contexto de autenticação
export const AuthContext = createContext({} as AuthContextProps)

// Componente provedor do contexto de autenticação
export function AuthProvider({ children }: AuthProviderProps) {
    // Estado local para armazenar os dados do usuário e o indicador de carregamento
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    // Função assíncrona para lidar com o login do usuário, usando de carregamento e alerta de sucesso e de erro.
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario)
            toastAlerta("Usuário logado com sucesso", "sucesso")
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            toastAlerta("Dados do usuário inconsistentes", "erro")
            setIsLoading(false)
        }
    }

    // Função para logout do usuário
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }
    
    // Retorna o provedor do contexto de autenticação com os valores atualizados -- OBRIGATÓRIO
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}