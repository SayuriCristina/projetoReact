/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";

// Criação de uma instância do Axios com uma URL base
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Função para cadastrar um usuário 
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// Função para realizar o login
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// Função para buscar dados (GET)
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

// Função para cadastrar dados (POST)
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

// Função para atualizar dados (PUT)
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

// Função para deletar dados (DELETE)
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}