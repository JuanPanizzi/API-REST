import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Users/User.module';
import { PostModule } from './post/post.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/base-de-datos-tp-final'),
   UserModule,
   PostModule,
   AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
