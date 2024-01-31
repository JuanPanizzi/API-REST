import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
   
    // @ApiProperty()
    // readonly _id?: string;
    @ApiProperty()
    readonly name?: string;
    @ApiProperty()
    readonly password?: string;
    @ApiProperty()
    readonly isAdmin?: boolean;
}
