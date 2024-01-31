import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>

@Schema()
export class Post {

    @Prop({type: String || Number, required: true})
    userId: number | string;

    @Prop({type: String, required: true})
    titulo: string;

    @Prop({type: String, required: true})
    autor: string;
    
    @Prop({type: String, required: true})
    contenido: string;
    
    @Prop({type: [String], required: true})
    categorias: string[];
    
}

export const PostSchema = SchemaFactory.createForClass(Post);