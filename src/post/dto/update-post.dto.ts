import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {

    @ApiProperty()
    readonly userId?: number | string;
    @ApiProperty()
    readonly titulo?: string;
    @ApiProperty()
    readonly autor?: string;
    @ApiProperty()
    readonly contenido?: string;
    @ApiProperty()
    readonly categorias?: string[];
}
