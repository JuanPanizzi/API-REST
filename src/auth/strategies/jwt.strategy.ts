import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserPayload } from "../../Users/interfaces/UserPayload";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "secretWord"
        });
    }
    async validate(payload: UserPayload){
        const payloadData = {_id: payload.sub, name: payload.name, isAdmin: payload.isAdmin}
        
        return payloadData;
    }
}