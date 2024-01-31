import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostModule } from './post.module';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { createPostDto, filter, mockPost, mockPosts, queries } from './test-post-controller/constants';
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
      

      jest.spyOn(postService, 'create').mockResolvedValue(mockPost);

      const result = await controller.create(createPostDto);

      expect(result).toBe(mockPost);
      expect(postService.create).toHaveBeenCalledWith(createPostDto);
    });
  })




  describe('findAll', () => {
    it('debería retornar un array de posts', async ()=> {

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

        const id: string = "123sf"

        jest.spyOn(postService, 'findOne').mockResolvedValue(mockPost)

        const result = await controller.findOne(id);

        expect(result).toEqual(mockPost);
        expect(postService.findOne).toHaveBeenCalled();

      })
    })

    describe('getByQuery', ()=>{ 

      it('debería retornar un array de posts', async ()=> {
      

      jest.spyOn(postService, 'getByQuery').mockResolvedValue(mockPosts)

      const result = await controller.getByQuery(queries);

      expect(result).toEqual(mockPosts);
      expect(postService.getByQuery).toHaveBeenCalled();

      })
    })

    describe('getByFilter', ()=>{ 

      it('debería retornar un array de posts', async ()=> {
      

      jest.spyOn(postService, 'getByFilter').mockResolvedValue(mockPosts)

      const result = await controller.getByFilter(filter);

      expect(result).toEqual(mockPosts);
      expect(postService.getByFilter).toHaveBeenCalled();

      })
    })


});
