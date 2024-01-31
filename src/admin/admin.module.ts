import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PostService } from 'src/post/post.service';
import { PostModule } from 'src/post/post.module';
import { UserService } from 'src/Users/User.service';
import { UserModule } from 'src/Users/User.module';

@Module({
  imports:[
    JwtModule.register({secret: "secretWord",
  signOptions: {expiresIn: '300s'} }),
  PostModule, UserModule],
  controllers: [AdminController],
  providers: [AdminService, PostService, JwtStrategy, RolesGuard, UserService],
})
export class AdminModule {}
