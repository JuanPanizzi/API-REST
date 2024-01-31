import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
// import { PostInterface } from './interfaces/postInterface';
import { PostModule } from './post.module';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { PostInterface } from './interfaces/postInterface';

describe('PostController', () => {
  let controller: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     imports: [PostModule]
    })
    .overrideProvider(getModelToken(Post.name))
    .useValue(jest.fn())
    .compile();

    controller = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create', () => {
    it('debería crear un nuevo post', async () => {
      const createPostDto: CreatePostDto = {
        userId: "1",
        titulo: "Futbol",
        autor: "Maradona",
        contenido: "lorem ipsum",
        categorias: ["lorem", "ipsum"]
        
      };

      const mockPost: PostInterface = {
        _id: "asd",
        userId: "1",
        titulo: "Futbol",
        autor: "Maradona",
        contenido: "lorem ipsum",
        categorias: ["lorem", "ipsum"]
        
      };

      jest.spyOn(postService, 'create').mockResolvedValue(mockPost);

      const result = await controller.create(createPostDto);

      expect(result).toBe(mockPost);
      expect(postService.create).toHaveBeenCalledWith(createPostDto);
    });
  })




  describe('findAll', () => {
    it('debería retornar un array de posts', async ()=> {

      //Lo que se espera que se devuelva
      const mockPosts: PostInterface[] = [
        {
          _id: "asd",
          userId: "1",
          titulo: "Futbol",
          autor: "Maradona",
          contenido: "lorem ipsum",
          categorias: ["lorem", "ipsum"]
          
        }
      ]

      //Simula el comportamiento del findAll del userService y especifica lo que tiene que devolver
      jest.spyOn(postService, 'findAll').mockResolvedValue(mockPosts)

      //Se llama al metodo findAll()
      const result = await controller.findAll();

      //Se contrasta si el resultado devuelto se corresponde con el resultado que esperamos
      expect(result).toEqual(mockPosts);
      expect(postService.findAll).toHaveBeenCalled();
    });
    })


    describe('findOne', ()=> { 
      it('debería retornar un post en específico', async ()=> {

        const mockPost: PostInterface = {
          _id: "asd",
          userId: "1",
          titulo: "Futbol",
          autor: "Maradona",
          contenido: "lorem ipsum",
          categorias: ["lorem", "ipsum"]
          
        };
        const id: string = "123sf"

        jest.spyOn(postService, 'findOne').mockResolvedValue(mockPost)

        const result = await controller.findOne(id);

        expect(result).toEqual(mockPost);
        expect(postService.findOne).toHaveBeenCalled();

      })
    })




});
