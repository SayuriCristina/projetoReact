// especifica a estrutura que um objeto usuário deve seguir e inclui uma propriedade opcional POSTAGEM, 
// que pode ser um objeto do tipo Postagem ou null.

import Postagem from "./Postagem";

export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    postagem?: Postagem | null;
}