import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuerySearch } from './interfaces/querySearch';
// import { PostInterface } from './interfaces/postInterface';
import { SearchQuery } from './interfaces/searchQuery';
import { QueryFilter } from './interfaces/queryFilter';

@Injectable()
export class PostService {

  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>
  ) { }

  async getByQuery(queries: QuerySearch): Promise<Post | Post[]> {

    const { titulo, autor, contenido, categorias } = queries;

    let { limit } = queries
    
    if(!limit){
      limit = 10
    }
    
    const searchQuery: SearchQuery = {};

    if (titulo) {
      searchQuery.titulo = { $regex: titulo, $options: 'i' };
    }

    if (autor) {
      searchQuery.autor = { $regex: autor, $options: 'i' };
    }

    if (contenido) {
      searchQuery.contenido = { $regex: contenido, $options: 'i' };
    }

    if (categorias) {
      searchQuery.categorias = { $in: categorias };
    }

    const posts = await this.postModel.find(searchQuery).limit(limit);

    if(posts && posts.length > 0){
      return posts;
    }else{
      throw new NotFoundException('No se encontraron posts con los parámetros de búsqueda proporcionados.')
    }
  }

  async getByFilter(query: QueryFilter): Promise<Post | Post[]> {

    const { autor, categorias } = query;

    const searchQuery: SearchQuery = {};

    if (autor) {
      searchQuery.autor = { $regex: autor, $options: 'i' };
    }
    if (categorias) {
      searchQuery.categorias = { $in: categorias };
    }

    const posts = await this.postModel.find(searchQuery);

    if(posts && posts.length > 0){
      return posts;
  }else{
    throw new NotFoundException('No se encontraron posts con los parámetros de búsqueda proporcionados.')
  }
  }
  async create(createPostDto: CreatePostDto): Promise<Post> {

    const newPost = new this.postModel(createPostDto);
    return newPost.save();
  }

  async findAll(limit: number = 0): Promise<Post[]> {

    if(limit>0){
    return this.postModel.find().limit(limit).lean();
    }else{
      return this.postModel.find().lean();
    }

  }

  async findOne(id: string): Promise<Post> {

    return this.postModel.findOne({_id: id}).lean()
    
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {

    return this.postModel.updateOne({_id: id}, updatePostDto).lean()

  }

  async remove(id: string): Promise<Post> {
    return this.postModel.deleteOne({_id: id}).lean()
  }
  async findAllUserPosts(userId: string | number): Promise<Post[]> {

    const userPosts: Promise<Post[]> | Post[] =  await this.postModel.find({userId: userId}).lean();

    if(userPosts.length > 0){
      return userPosts
    }else{
      throw new NotFoundException('No se encontraron posts para el usuario');
    }
  }
  

  }

