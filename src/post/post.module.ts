import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{name: Post.name, schema: PostSchema}],),
  JwtModule.register({secret: "secretWord",
            signOptions: {expiresIn: '3600s'} }),
],
  controllers: [PostController],
  providers: [PostService, JwtStrategy],
  exports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
})
export class PostModule {}
