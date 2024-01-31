import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInt } from './interfaces/UserInt';
import { UserModule } from './User.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/User';
import { AccessTokenModelDto } from './dto/accesToken.dto';
import { LoginDto } from './dto/login.dto';
// import { UnauthorizedException } from '@nestjs/common';


describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     imports: [UserModule]
    })
    .overrideProvider(getModelToken(User.name))
    .useValue(jest.fn())
    .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('debería crear un nuevo usuario', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Lionel Messi',
        password: '1234',
        isAdmin: false
      };

      const mockUser: UserInt = {
        _id: "1",
        name: "Lionel Messi",
        password: "1234",
        isAdmin: false
      };

      jest.spyOn(userService, 'create').mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toBe(mockUser);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  })


    describe('login', () => {
      it('debería retornar un token de acceso', async ()=>{

      const mockUser: LoginDto = { name: 'Luis Suarez', password: '4321' };
      const mockAccessToken: AccessTokenModelDto = { acces_token: 'asdlkasdk232sd' };
      const mockReq = { user: mockUser };

      jest.spyOn(userService, 'login').mockResolvedValue(mockAccessToken);

      const result = await controller.login(mockReq);

      expect(result).toEqual(mockAccessToken);
      expect(userService.login).toHaveBeenCalledWith(mockUser);
      })
    })

    describe('findAll', () => {
      it('debería retornar un array de usuarios', async ()=> {

        //Lo que se espera que se devuelva
        const mockUsers: UserInt[] = [
          {_id: "123", name: "Juan", password: "1223", isAdmin: false},
          {_id: "1223", name: "Pablo", password: "12234", isAdmin: true} 
        ]

        //Simula el comportamiento del findAll del userService y especifica lo que tiene que devolver
        jest.spyOn(userService, 'findAll').mockResolvedValue(mockUsers)

        //Se llama al metodo findAll()
        const result = await controller.findAll();

        //Se contrasta si el resultado devuelto se corresponde con el resultado que esperamos
        expect(result).toEqual(mockUsers);
        expect(userService.findAll).toHaveBeenCalled();
      });
      })

      describe('findOne', ()=> { 
      it('debería retornar un usuario registrado', async ()=> {

        const mockUser: UserInt = {
          _id: "1",
          name: "Ronaldinho",
          password: "1234",
          isAdmin: false
        };
        const id: string = "123sf"

        jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser)

        const result = await controller.findOne(id);

        expect(result).toEqual(mockUser);
        expect(userService.findOne).toHaveBeenCalled();

      })
    })


  });





// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './User.controller';
// import { UserService } from './User.service';
// // import { CreateUserDto } from './dto/create-user.dto';
// // import { UserInt } from './interfaces/UserInt';
// import { UserModule } from './User.module';
// import { User } from './schemas/User';
// import { getModelToken } from '@nestjs/mongoose';
// describe('UserController', () => {

//   let controller: UserController;
//   let userService: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports:[UserModule]
//     })
//     .overrideProvider(getModelToken(User.name))
//     .useValue(jest.fn())
//     .compile();

//     controller = module.get<UserController>(UserController);
//     userService = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   // describe('createUser', ()=> {

//   //   it('debería crear un usuario nuevo', async ()=> {


//   //     const createUserDto: CreateUserDto = {
//   //       name: 'John Doe',
//   //       password: 'password123',
//   //       isAdmin: false
//   //     };

//   //     const mockUser: UserInt = {
//   //       _id: '1',
//   //       name: createUserDto.name,
//   //       password: createUserDto.password,
//   //       isAdmin: createUserDto.isAdmin
//   //     };

//   //     jest.spyOn(userService, 'create').mockResolvedValue(mockUser);
      
//   //     const resultado = await controller.createUser(createUserDto);

//   //     expect(resultado).toBe(mockUser);

//   //     expect(userService.create).toHaveBeenCalledWith(createUserDto);

//   //   })

//   // })

// })
