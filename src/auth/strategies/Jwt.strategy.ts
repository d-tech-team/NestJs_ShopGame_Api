import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";

const { JWT_SECRET } = process.env


console.log(JWT_SECRET);


@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'lctiendat',
        });
    }

    async validate(payload: any) {        
        return { userId: payload.sub, username: payload.username, role: payload.role };
    }
}