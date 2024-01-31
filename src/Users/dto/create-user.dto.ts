// import { ApiProperty } from "@nestjs/swagger";

import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly isAdmin: boolean;
}
