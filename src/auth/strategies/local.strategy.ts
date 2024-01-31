import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../../Users/User.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private userService: UserService){
        super({usernameField: 'name'})
    }

    async validate(username: string, password: string): Promise<any>{

        const user = await this.userService.validateUser(username, password)

        if(!user){
            throw new UnauthorizedException('Loguin incorrecto')
        }else{
            return user
        }
    }
}