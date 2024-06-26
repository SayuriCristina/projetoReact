// Especifica as propriedades que um objeto postagem deve ter, incluindo referências a outras interfaces (Tema e Usuario). 
// As propriedades TEMA e USUARIO podem ser objetos dessas interfaces ou null.

import Tema from "./Tema";
import Usuario from "./Usuario";

export default interface Postagem {
    id: number;
    titulo: string;
    texto: string;
    data: string;
    tema: Tema | null;
    usuario: Usuario | null;
}
