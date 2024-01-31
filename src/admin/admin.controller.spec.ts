import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminModule } from './admin.module';
import { UserService } from '../Users/User.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../Users/schemas/User';
import { UserInt } from '../Users/interfaces/UserInt';
import { UnauthorizedException } from '@nestjs/common';
import { UserModule } from '../Users/User.module';
import { PostService } from '../post/post.service';
import { PostModule } from '../post/post.module';
import { Post } from '../post/schemas/post.schema';

describe('AdminController', () => {
  let controller: AdminController;
  let userService: UserService;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule, UserModule]
    })
    .overrideProvider(getModelToken(User.name)).useValue(jest.fn())
    .overrideProvider(getModelToken(Post.name)).useValue(jest.fn())
    .compile();

    controller = module.get<AdminController>(AdminController);
    userService = module.get<UserService>(UserService);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findUsers', () => {

    it('should return users when user is admin', async () => {

      // const users = [{ name: 'John' }, { name: 'Doe' }];
    
      const mockUsers: UserInt[] = [{
          _id: "asd",
          name: "lorem ipsum",
          password: "lorem ipsum",
          isAdmin: false,
      }]
      const req = { user: { isAdmin: true } };

      jest.spyOn(userService, 'findAll').mockResolvedValue(mockUsers);

    const result = await controller.findUsers(req);

    expect(result).toEqual(mockUsers);
    expect(userService.findAll).toHaveBeenCalled();

      // expect(await controller.findAll(req)).toEqual(mockUsers);
    
    //Se llama al metodo findAll()
    // const result = await controller.findAll();

    //Se contrasta si el resultado devuelto se corresponde con el resultado que esperamos
    
    
    });

    it('should throw UnauthorizedException when user is not admin', async () => {
      

      const mockUsers: UserInt[] = [{
        _id: "asd",
        name: "lorem ipsum",
        password: "lorem ipsum",
        isAdmin: false,
    }]
    const req = { user: { isAdmin: true } };

    jest.spyOn(userService, 'findAll').mockResolvedValue(mockUsers);

  const result = await controller.findUsers(req);

  expect(result).rejects.toThrow(UnauthorizedException);
  expect(userService.findAll).toHaveBeenCalled();

    });
  });

});
