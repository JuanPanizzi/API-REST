import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    readonly userId: number | string;
    @ApiProperty()
    readonly titulo: string;
    @ApiProperty()
    readonly autor: string;
    @ApiProperty()
    readonly contenido: string;
    @ApiProperty()
    readonly categorias: string[];
    

}
