import { Module } from '@nestjs/common';
// import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PostService } from '../post/post.service';
import { PostModule } from '../post/post.module';
import { UserService } from '../Users/User.service';
import { UserModule } from '../Users/User.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from '../Users/schemas/User';

@Module({
  imports:[
    JwtModule.register({secret: "secretWord",
  signOptions: {expiresIn: '300s'} }),
  PostModule, UserModule],
  controllers: [AdminController],
  providers: [ PostService, JwtStrategy, RolesGuard, UserService],
  // exports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class AdminModule {}
