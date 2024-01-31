export interface SearchQuery {
        titulo?: { $regex: string, $options: string };
        autor?: { $regex: string, $options: string };
        contenido?: { $regex: string, $options: string };
        categorias?: { $in: string[] };
}