// Especifica as propriedades que um objeto UsuarioLogin deve ter. Inclui o token, que é responsável
// pela validação do login.

export default interface UsuarioLogin {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    token: string;
}