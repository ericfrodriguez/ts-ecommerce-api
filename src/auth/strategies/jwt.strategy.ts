import { ExtractJwt, Strategy as JwtStr, StrategyOptions } from "passport-jwt";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passport.use";
import { PayloadToken } from "../interfaces/auth.interface";
import { UserService } from "../../user/services/user.service";

type JwtStrategyCallback = (jwtPayload: PayloadToken, done: any) => Promise<PayloadToken>

export class JwtStrategy extends AuthService {

    constructor(
    ) {
        super();
        this.verify = this.verify.bind(this);
    }

    private async verify(jwt_payload: PayloadToken, done: any): Promise<PayloadToken> {
        try {
            const user = await this.userService.findById(jwt_payload.sub);

            if (user) {
                return done(null, jwt_payload)
            }

            return done(null, false);

        } catch (err) {
            return done(err);
        }
    }

    get use() {

        return PassportUse<JwtStr, StrategyOptions, JwtStrategyCallback>(
            'jwt',
            JwtStr,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnvironment('JWT_SECRET'),
            },
            this.verify
        );
    }
}