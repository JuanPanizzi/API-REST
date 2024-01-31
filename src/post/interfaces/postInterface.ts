export interface PostInterface {
     _id?: string;
     userId: number | string;
     titulo: string;
     autor: string;
     contenido: string;
     categorias: string[];
}