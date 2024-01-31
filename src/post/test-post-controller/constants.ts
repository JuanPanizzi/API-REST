import { CreatePostDto } from "../dto/create-post.dto";
import { PostInterface } from "../interfaces/postInterface";
import { QueryFilter } from "../interfaces/queryFilter";
import { QuerySearch } from "../interfaces/querySearch";

export const createPostDto: CreatePostDto = {
    userId: "1",
    titulo: "Futbol",
    autor: "Maradona",
    contenido: "lorem ipsum",
    categorias: ["lorem", "ipsum"]
    
  };

  export const mockPost: PostInterface = {
    _id: "asd",
    userId: "1",
    titulo: "Futbol",
    autor: "Maradona",
    contenido: "lorem ipsum",
    categorias: ["lorem", "ipsum"]
    
  };

  export const mockPosts: PostInterface[] = [
    {
      _id: "asd",
      userId: "1",
      titulo: "Futbol",
      autor: "Maradona",
      contenido: "lorem ipsum",
      categorias: ["lorem", "ipsum"]
      
    }
  ]

  export const queries: QuerySearch = {
    titulo: "lorem ipsum",
    autor: "lorem ipsum",
    contenido: "lorem ipsum",
    categorias: ["lorem ipsum"],
    limit: 5
}
export const filter: QueryFilter = {
  autor: "Messi",
  categorias: ["lorem", "ipsum"]
}