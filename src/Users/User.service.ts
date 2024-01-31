import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/User';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserInt } from './interfaces/UserInt';
import { AccesToken } from './interfaces/AccesToken';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}


  async create(createUserDto: CreateUserDto): Promise<User> {

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save()

  }

  async findAll(): Promise<UserInt[]> {

    return this.userModel.find().lean()

  }

  async findOne(id: string): Promise<User> {
    
    return this.userModel.findOne({ _id: id }).lean();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    return this.userModel.updateOne({ _id: id }, updateUserDto)
  }

  async remove(id: string) {
    return this.userModel.deleteOne({_id: id}).lean()
  }

  async validateUser(username: string, password: string): Promise<any>{
    
    const users = await this.findAll()
    const user = users.find(elem => elem.name == username && elem.password == password)

    if(user){

        return {_id: user._id.toString(), name: user.name, isAdmin: user.isAdmin}

    }else{
        return null
    }
}

async login(user: UserInt): Promise<AccesToken> {

  const payload = { sub: user._id, name: user.name, isAdmin: user.isAdmin } 
  return {acces_token: this.jwtService.sign(payload)}
}
}



