import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/User';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports:[ PassportModule, UserModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}],),
            JwtModule.register({secret: "secretWord",
            signOptions: {expiresIn: '300s'} })
],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
  exports: [UserService, MongooseModule.forFeature([{name: User.name, schema: UserSchema}],)]
})
export class UserModule {}
